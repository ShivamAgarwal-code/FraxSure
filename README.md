# FXTLSure

## Description:

1. The inspiration behind creating FXTLSure, the Decentralised Insurance Platform, stems from a vision to bring transformative change to the insurance industry.
2. FXTL, as a coin, played a pivotal role in shaping the concept of FXTLSure. Its stability and peg to a value of 1 USD made it an ideal candidate to serve as the primary currency within the insurance ecosystem. Leveraging FXTL tokens allowed us to offer users the ability to lock their tokens, earning them valuable discounts on insurance premiums. Additionally, enabling customers to purchase insurance premiums in the form of NFTs using FXTL further enhanced the platform's versatility and ease of use.
3. FXTLSure stands out with its inflation-protected insurance coverage. By using the stability of FXTL tokens, and incorporating truflation data, we ensure policyholders' purchasing power is safeguarded against inflation's impact. This combination of FXTL and truflation sets FXTLSure apart, providing customers with peace of mind and reliable financial security.


### **Here are the key points highlighting what FXTLSure does**

- FXTLSure is a Decentralised Insurance Platform designed for the FXTLtal Hackathon.
- Users can lock FXTL tokens, earning them discounts on insurance premiums as an incentive to participate.
- The platform allows users to purchase insurance premiums in the form of NFTs using FXTL tokens, a stablecoin with a 1:1 peg to the USD.
- When customers make insurance claims, the platform reviews and facilitates payment to the policy owner in FXTL tokens.
- FXTLSure's unique feature is its inflation-protected insurance coverage, mitigating the risk of inflation eroding the policyholder's purchasing power.
- The insurance premium is calculated based on the inflation value of 1 USD, obtained using truflation, an off-chain mechanism tracking real-world inflation rates, the inflation data is regularly updated using chainlink automation.
- By leveraging the stability of FXTL tokens and incorporating truflation data, FXTLSure ensures customers' assets are safeguarded against the impact of inflation, providing them with confidence and financial security.

Through this innovative blend of NFTs, FXTL , Truflation data, and ChainLink automation, FXTLSurance crafts an insurance platform that harmonizes convenience, security,risk-free environment and inflation protection. By putting the power back into the hands of the users, this visionary project enculcates the spirit of technological advancement and a genuine commitment to empowering individuals and businesses in their pursuit of comprehensive insurance coverage.

## Installation:

1. Clone the FXTLSurance repository
    
     `git clone https://github.com/ShivamAgarwal-code/FXTLSure.git`
    
2. To deploy contract `cd smartContract`
3. run `npm install`
4. set up environment variables for [Private Key].
5. Connect your account to `goerli testnet` and `deploy`
6. run:
    1. `npx hardhat run scripts/deploy.js`
    2. `npx hardhat run scripts/FXTLDeploy.js`
    3. `npx hardhat run scripts/truflationDeploy.js`
7. To run the project locally: go to `cd frontend`
8. Now the add the address of `NFT, Marketplace, FXTL and Truflation` at respective holders in `App.js`
9. Automate the `requestYoyInflation` function in Truflation.js using ChainLink. Example: https://automation.chain.link/goerli/85824714380130344892932313821863739689977789604226601839239682192663830603858
10. Install the necessary dependencies: `npm install`
11. Run the FXTLSure `npm run start`
