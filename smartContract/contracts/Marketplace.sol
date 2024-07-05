// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./fraxTest.sol";


contract Marketplace is ReentrancyGuard{
    address payable public feeAccount;
    uint256 public itemCount;
    IERC20 token;
    uint256 public unit=10**18;

    constructor(){
        feeAccount = payable(msg.sender);
        token=IERC20(0x4cAab96b2E442E78cA5fc72FaEd2305dE115FB36);
    }

    event Offered(uint itemId,address indexed nft,uint tokenId,uint price,address indexed seller);

    struct Item{
        uint256 itemId;
        IERC721 nft;
        uint256 tokenId;
        uint256 price;
        address payable seller;
        bool active;
    }
    
    struct Details{
        uint256 itemId;
        uint256 price;
        address owner;//In struct item it is mentioned as seller
        string name;
        string registrationNumber;
        uint256 timestamp;
        uint256 duration;
        bool active;
    }

    struct message{
        address customer;
        uint256 itemId;
        uint256 price;
        string reason;
    }

    struct Lock {
        uint256 amount;
        uint256 unlockTimestamp;
        bool unlocked;
    }
    
    mapping(address => Lock[]) public userLocks;
    mapping(address => uint256) public discountPercent;

    mapping(address=>message[])public messages;
    mapping(uint256=>message[])public messagesNFT;
    
    //itemId=>Item
    mapping(uint256 => Item) public items;
    mapping(uint256 => Details) public itemDetails;

    uint256 public constant returnRate = 5;

    function makeItem(IERC721 _nft,uint256 tokenId, uint256 price,string memory name,string memory rNo,uint256 duration) external nonReentrant{
        require(price > 0,"Price must be greater than 0");
        itemCount++;
        _nft.transferFrom(msg.sender,address(this),tokenId);
        items[itemCount] = Item(
            itemCount,
            _nft,
            tokenId,
            price,
            payable(msg.sender),
            true
        );
        itemDetails[itemCount] = Details(
            itemCount,
            price,
            msg.sender,
            name,
            rNo,
            block.timestamp,
            duration,
            true
        );
         emit Offered(itemCount,address(_nft),tokenId,price,msg.sender);
    }

    function requestClaim(uint256 itemId,uint256 claimPrice)public{
        require(msg.sender==items[itemId].seller);
        message memory newMessage = message(msg.sender, itemId, claimPrice, "I am claiming Insurance for my car");
        messages[feeAccount].push(newMessage);
    }

    function sendClaim(uint256 itemId,address customer,uint256 claimPrice)public returns(bool){
        require(msg.sender==feeAccount);
        bool x=token.transferFrom(msg.sender,customer,claimPrice*unit);
        message memory newMessage = message(msg.sender, itemId, claimPrice*unit, "Your claim for Insurance is approved and sent");
        messagesNFT[itemId].push(newMessage);
        messages[customer].push(newMessage);
        return x;
    }

    function checkActive(uint itemId)public{
        if(itemDetails[itemId].timestamp + itemDetails[itemId].duration <= block.timestamp){
            itemDetails[itemId].active=false;
            items[itemId].active=false;
        }
    }

    function getItemDetail(uint256 itemId)public view returns(Details memory){
        return itemDetails[itemId];
    }
    
    function getMessageNFT(uint256 itemId)public view returns(message[] memory){
        return messagesNFT[itemId];
    }

    function getMessageOwner()public view returns(message[] memory){
        return messages[msg.sender];
    }

    function lockTokens(uint256 _amount, uint256 _lockDuration) public {
        require(_amount > 0, "Amount must be greater than zero");
        require(_lockDuration > 0, "Lock duration must be greater than zero");
        
        uint256 unlockTimestamp = block.timestamp + _lockDuration;
        uint256 totalDiscountPercentage =  calculateDiscount(_amount,unlockTimestamp);
        discountPercent[msg.sender]=totalDiscountPercentage;
        token.transferFrom(msg.sender, address(this), _amount);
        userLocks[msg.sender].push(Lock(_amount, unlockTimestamp, false));
    }

    function unlockTokens() public {
        Lock[] storage locks = userLocks[msg.sender];
        uint256 totalReturnAmount = 0;
        for (uint256 i = 0; i < locks.length; i++) {
            Lock storage lock = locks[i];
            if (!lock.unlocked && block.timestamp >= lock.unlockTimestamp) {
                uint256 returnAmount = (lock.amount * returnRate) / 100;
                totalReturnAmount += returnAmount;
                lock.unlocked = true;
                token.transfer(msg.sender, returnAmount);
            }
        }
    }

    function calculateDiscount(uint256 _amount, uint256 _unlockTimestamp) public view returns (uint256) {
        // Calculate the number of days remaining until unlock
        uint256 remainingDays = (_unlockTimestamp - block.timestamp) / (1 days);
        
        // Calculate the discount percentage based on the remaining days and amount
        uint256 discountPercentage;
        
        if (remainingDays >= 10) {
            discountPercentage = 10;  // 10% discount for locks of 90 days or more
        } else if (remainingDays >= 5) {
            discountPercentage = 5;   // 5% discount for locks of 30-89 days
        } else {
            discountPercentage = 0;   // No discount for locks less than 30 days
        }
        return discountPercentage;
    }

    function getUserLocks(address _user) public view returns (Lock[] memory) {
        return userLocks[_user];
    }
}

//Marketplace deployed to: 0xdD763779e89838B1B4d99593D27337411635164E