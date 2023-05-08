Contract deployed address: 0x5FbDB2315678afecb367f032d93F642f64180aa3

## How to use

1. Clone the repo https://github.com/afrazahmad-hub/SupplyChain-Product-Tracker-Dapp-.git

2. run "npm init" to install the dependencies

3. run "npx hardhat node" to run the local blockchain of hardhat.

4. run the following command to deploy the project
   npx hardhat run scripts/deploy.js --network localhost

5. run "npm run dev" to start the localhost

6. Connect the Wallet Using "Connect Wallet" button. And create shipment by clicking on "Add Tracking" button. fill the required fields and create the shipment.

7. To see the shipments, click on "GET SHIPMENT" button, enter ID.

8. To start the shipment click "START SHIPMENT" button, enter receiver address and ID.

9. To complete the shipment click "COMP SHIPMENT" button, enter receiver address and ID.

10. To show the user profile, click on "USER PROFILE" button

# Packeges utilized

@ Hardhat
@ Next.js
@ TailwindCSS
@ Ethers.js
@ web3Modal

Open API key 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

# sequance

=> Components/Navbar
=> Components/Footer
=> Components/Services
=> Components/getShipment
=> Components/startShipment
=> Components/completeShipment
=> Components/userProfile

# fix error

1. error of getting shipments..........to resolve the error run following deployed command using LOCAL HOST
   npx hardhat run scripts/deploy.js --network localhost

2. Clear previous transaction data before making trasaction in matamask, otherwise will show error
