import React from "react";
import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { Contract, ethers } from "ethers";
import { createContext } from "react";

// Internal imports
import tracking from "../Context/Tracking.json";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = tracking.abi;

// --- FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) => {
  new ethers.Contract(contractAddress, contractABI, signerOrProvider);
};

//  React context allows us to share data (state) across our components more easily.
// By using context we can avoid props, to enter every single chield. rather we can get directly any any chield
export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
  // STATE VARIABLES
  const DappName = "Product Tracking Dapp";

  const [currentUser, setCurrentUser] = useState("");

  const createShipment = async (items) => {
    console.log(items);

    // --- get the arguments of "createShipment" function from contract.
    const { receiver, pickupTime, distance, price } = items;

    try {
      // we are using a packege called "web3Modal" for connection with wallet.
      const web3Modal = new Web3Modal();
      const connect = await web3Modal.connect();

      const provider = new ethers.providers.Web3Provider(connect);

      //   we are calling signer, because we have to make transaction
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      //   calling the function of contract i.e. createShipment
      const createItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(), // block.timeStamp
        distance,
        // --Condition meet that msg.value === price
        ethers.utils.parseUnits(price, 18),
        {
          value: ethers.utils.parseUnits(price, 18),
        }
      );

      //   wait untill create item rander.
      await createItem.wait();
      console.log(createItem);
    } catch (error) {
      throw new Error("Failed to create shipment: ", error);
    }
  };

  async function getAllShipments() {
    const provider = new ethers.providers.JsonRpcProvider();

    // Notice that we are not usning the Signer here,
    // The reason is that we are not going change any state vareiable
    // Thats why wee do not need to provide "Signer" /
    // Simply we do not need to do any transaction.
    const contract = fetchContract(provider);

    try {
      const shipments = await contract.getAllTransactions();
      const allShipments = shipments.map((shipment) => ({
        sender: shipment.sender,
        receiver: shipment.receiver,
        price: ethers.utils.formatEther(shipment.price.toString()),
        pickupTime: shipment.pickupTime.toNumber(),
        deliveryTime: shipment.deliveryTime.toNumber(),
        distance: shipment.distance.toNumber(),
        isPaid: shipment.isPaid,
        status: shipment.status,
      }));
      return allShipments;
    } catch (error) {
      throw new Error("Failed to fetch shipments: ", error);
    }
  }

  async function getShipmentCount() {
    try {
      // Condition to check weather any wallet is install or not in browser
      if (!window.ethereum) return "Please install a wallet i.e. Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const provider = new ethers.providers.JsonRpcProvider();
      // again we are not using signer, because we are just fatching the data
      const contract = fetchContract(provider);

      // get the count of shipments of particular account
      const shipmentCount = await contract.getShipmentCount(accounts[0]);
      return shipmentCount.toNumber();
    } catch (error) {
      throw new Error("No Shipment Count: ", error);
    }
  }

  async function completeShipment(completeShip) {
    console.log(completeShip);

    const { receiver, index } = completeShip;

    try {
      if (!window.ethereum) return "Please install a wallet i.e. Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const web3Modal = new Web3Modal();
      const connection = web3Modal.connect();

      const provider = new ethers.utils.JsonRpcProvider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.completeShipment(
        // arguments of smart contrat function
        accounts[0], //---Sender
        receiver, //--receiver
        index, //---index
        {
          gasLimit: 30000,
        }
      );
      transaction.wait();
      console.log(transaction);
    } catch (error) {
      throw new Error("Wrong complete shipent: ", error);
    }
  }

  async function getShipment(index) {
    console.log(index * 1);

    try {
      if (!window.ethereum) return "Please install a wallet i.e. Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      // passed the arguments of getShipment function of smart contract i.e. sender & index number
      const shipment = await contract.getShipment(accounts[0], index * 1);
      console.log(shipment);

      // if we console the "shipment" we will get an array,
      // so by calling index we get all datat as following
      const singleShipment = {
        sender: shipment[0],
        receiver: shipment[1],
        pickupTime: shipment[2].toNUmber(),
        deliveryTime: shipment[3].toNUmber(),
        distance: shipment[4].toNUmber(),
        price: ethers.utils.formatEther(shipment[5].toString()),
        status: shipment[6],
        isPaid: shipment[7],
      };
      return singleShipment;
    } catch (error) {
      throw new Error("Sorry no shipments; ", error);
    }
  }

  async function startShipment(getProduct) {
    const { receiver, index } = getProduct;

    try {
      if (!window.ethereum) return "Please install a wallet i.e. Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.JsonRpcProvider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const shipment = contract.startShipment(accounts[0], receiver, index * 1); // while passing the SM function arguments
      shipment.wait();
    } catch (error) {
      throw new Error("Sorry no shipments ", error);
    }
  }

  // --- CHECK WALLET CONNECTD

  async function chectIfWalletConnected() {
    try {
      if (!window.ethereum) return "Please install a wallet i.e. Metamask";

      const accounts = await window.ethereum.method({
        request: "eth_accounts",
      });

      if (accounts.length > 0) {
        setCurrentUser(accounts[0]);
      } else {
        return "No accounts";
      }
    } catch (error) {
      return "Not Connected";
    }
  }

  // --- CONNECT WALLET

  async function connectWallet() {
    try {
      if (!window.ethereum) return "Please install a wallet i.e. Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentUser(accounts[0]);
    } catch (error) {
      return "Install Metamask please";
    }
  }

  useEffect(() => {
    chectIfWalletConnected();
  }, []);

  return (
    // -- by utilizing the trackingContext packege, we call pass any valuein it i.e function, data, variable etc
    // -- and that data can be accessed through out trhe app
    <TrackingContext.Provider
      value={{
        connectWallet,
        createShipment,
        getAllShipments,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentCount,
        DappName,
        currentUser,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};
