// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./fraxTest.sol";

contract NFT is ERC721URIStorage {
    uint public tokenCount;
    IERC20 token;
    uint256 public units = 10**18;
    address public owner;
    constructor() ERC721("INSURANCE NFT","INFT") {
        token=IERC20(0x4cAab96b2E442E78cA5fc72FaEd2305dE115FB36);
        owner=msg.sender;
    }

    function mint(string memory _tokenURI,uint256 price) external returns(uint){
        //->Approve from fraxTest by calling approve() keeping _spender as contract address and amount as price
        bool x = token.transferFrom(msg.sender,owner,price*units);
        tokenCount++;
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return tokenCount;
    }
}

//NFT deployed to: 0xDA173A032664057ec0A55461Fe2c87aF01E7aB48
