import React, { useState, useEffect, useContext } from "react";

// --INTERNAL  IMPORTS.
import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
} from "../Components/index";

import { TrackingContext } from "../Context/Tracking";

const index = () => {
  const {
    currentUser,
    createShipment,
    getAllShipments,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentCount,
  } = useContext(TrackingContext);

  // -- STAT VARIABLES
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModel, setStartModel] = useState(false);
  const [completeModel, setCompleteModel] = useState(false);
  const [getModel, setGetModel] = useState(false);

  // --DATA STATE VARIABLE
  const [allShipmentsData, setallShipmentsData] = useState();

  useEffect(() => {
    const getCampaignData = getAllShipments();

    return async () => {
      const allData = await getCampaignData;
      setallShipmentsData(allData);
    };
  }, []);

  return (
    <div>
      <Services
        setOpenProfile={setOpenProfile}
        setCompleteModel={setCompleteModel}
        setGetModel={setGetModel}
        setStartModel={setStartModel}
      />
      <Table
        setCreateShipmentModel={setCreateShipmentModel}
        allShipmentsData={allShipmentsData}
      />
      <Form
        createShipmentModel={createShipmentModel}
        createShipment={createShipment}
        setCreateShipmentModel={setCreateShipmentModel}
      />
      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentCount={getShipmentCount}
      />
      <CompleteShipment
        completeModel={completeModel}
        setCompleteModel={setCompleteModel}
        completeShipment={completeShipment}
      />
      <GetShipment
        getModel={getModel}
        setGetModel={setGetModel}
        getShipment={getShipment}
      />
      <StartShipment
        startModel={startModel}
        setStartModel={setStartModel}
        startShipment={startShipment}
      />
    </div>
  );
};

export default index;
