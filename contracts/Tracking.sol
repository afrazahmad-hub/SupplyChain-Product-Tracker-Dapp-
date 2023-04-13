//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


// Uncomment this line to use console.log
// import "hardhat/console.sol";


contract Tracking {

    // status of shipment
    enum ShipmentStatus{PENDING, IN_TRANSIT, DELIVERED}


    // shipment details 
    struct Shipment{
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    // mapping for shipments against particular address.
    mapping(address => Shipment[]) public shipments;

    // counter for shipments
    uint256 public shipmentCount;

    // this is just for the sake of frontend use
    struct TypeShipment{
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    // store the typeShipment in an array
    TypeShipment[]  typeShipments;


    // Events for te different status of shipment.
    event shipmentCreated(address indexed sender, address indexed receiver, uint pickupTime, uint256 distance, uint256 price);
    event shipmentInTransit(address indexed sender, address indexed receiver, uint256 pickupTime);
    event shipmentDelivered(address indexed sender, address indexed receiver, uint256 pickupTime);

    event shipmentPaid(address indexed sender, address indexed receiver, uint256 amount);

    constructor(){
        //  count started from 0.
        shipmentCount = 0;
    }


    function createShipment(address _receiver, uint256 _pickupTime, uint256 _distance, uint256 _price) public payable{
        
        require(msg.value == _price, "Amount must be equal to price");
        
        // declared a variable named "shipment", and update the data of "Shipment" struct. //delegate call
        Shipment memory shipment = Shipment(msg.sender, _receiver, _pickupTime, 0, _distance, _price, ShipmentStatus.PENDING, false);

        // pushed the shipment variable's data into the shipments array/mapping
        shipments[msg.sender].push(shipment);

        // increase the shipmentCount
        shipmentCount++;

        // update the mapping for diplay data in frontend
        typeShipments.push(TypeShipment(
            msg.sender,
            _receiver,
            _pickupTime,
            0,
            _distance,
            _price,
            ShipmentStatus.PENDING,
            false
        ));

        // emit the shmimentCreated event
        emit shipmentCreated(msg.sender, _receiver, _pickupTime, _distance, _price);
    }


    // once the shipment is created the contract will hold the shipment
    // and when the shipmet will be ready to deliver
    // status will be updated that, shipment is ready to deliver.
    function startShipment(address _sender, address _receiver, uint256 _index) public{

        // find the particular shipment and update it,
        // we are storing because we are making changes in state variables. 
        // When we do not have to make changes in state variables we can call "memory" 
        Shipment storage shipment = shipments[_sender][_index];

        // Update also for display
        TypeShipment storage typeShipment = typeShipments[_index];


        // check validation for Receiver & status of stipment
        require(shipment.receiver == _receiver, "Invalied Receiver");
        require(shipment.status == ShipmentStatus.PENDING, "Shipmint is already in transit");

        // Update the status of shipment from PENDING to IN_TRANSIT
        shipment.status = ShipmentStatus.IN_TRANSIT;
        typeShipment.status = ShipmentStatus.IN_TRANSIT;

        emit shipmentInTransit(_sender, _receiver, shipment.pickupTime);
    }

    // this function will called when the delivery will be completed
    function completeShipment(address _sender, address _receiver, uint256 _index) public {

        //  we are mentioning the "storage"keyword because we are going to change the state lavel variable.
        Shipment storage shipment = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeShipments[_index];

        require(shipment.receiver == _receiver, "Invalid Receiver");
        require(shipment.status == ShipmentStatus.IN_TRANSIT, "Shipment is not in transit");
        require(!shipment.isPaid, "Shipment is already Paid");


        //  updated the status of state variables.
        shipment.status = ShipmentStatus.DELIVERED;
        shipment.deliveryTime = block.timestamp;

        typeShipment.status = ShipmentStatus.DELIVERED;
        typeShipment.deliveryTime = block.timestamp;

        // get the price and transfer to the sender account.
        uint256 amount = shipment.price;
        payable(shipment.sender).transfer(amount);


        // update the status of isPaid from "false" to "true"
        shipment.isPaid = true;
        typeShipment.isPaid = true;

        emit shipmentDelivered(_sender, _receiver, shipment.deliveryTime);
        emit shipmentPaid(_sender, _receiver, amount);
    }


    //  This function will alow us to get the data of particular shipment.
    function getShipment(address _sender, uint256 _index) public view returns(address, address, uint256, uint256, uint256, uint256, ShipmentStatus, bool){

        // we are using here the "memory" keyword, because we are not making any change in our state variables.
        // It will save our Gaa.
        Shipment memory shipment = shipments[_sender][_index];

        return(shipment.sender, shipment.receiver, shipment.pickupTime, shipment.deliveryTime, shipment.distance, shipment.price, shipment.status, shipment.isPaid);
    }

    function getShipmentCount(address _sender) public view returns(uint){
        // to save the Gas we are using the view keyword
        // because we are not making any change in state variable..........rather just reading.

        // it will return the shipments of a particular sender.
        return shipments[_sender].length;
    }

    function getAllTransactions() public view returns(TypeShipment[] memory){


        // it will return all the transactions in the marketplace.
        return typeShipments;
    }
}