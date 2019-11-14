import React from 'react';
import { LoomConnectionInfo, Dispatch } from "../../common/Interfaces";
import {
  LOOM_NETWORK,
  LOOM_DEV_NETWORK_ID,
  LOOM_DEV_READ_URL,
  LOOM_DEV_WRITE_URL,
  LOOM_EXTDEV_NETWORK_ID,
  LOOM_EXTDEV_READ_URL,
  LOOM_EXTDEV_WRITE_URL
} from "../../config";
import { ActionType, Store } from "../../common/Store";


export default function useLoadLoomConfig() {
  const { dispatch } = React.useContext(Store);
  let connectionInfo: LoomConnectionInfo|any = {};

  React.useEffect(()=> {
    if (LOOM_NETWORK==="DEV"){
      //console.log("DEV");
      connectionInfo.networkAlias = LOOM_NETWORK;
      connectionInfo.networkId = LOOM_DEV_NETWORK_ID;
      connectionInfo.writeUrl = LOOM_DEV_WRITE_URL;
      connectionInfo.readUrl = LOOM_DEV_READ_URL;
      
      dispatchConfig(connectionInfo, dispatch);
    }else if(LOOM_NETWORK==="EXTDEV"){
     // console.log("EXTDEV");
      connectionInfo.networkAlias = LOOM_NETWORK;
      connectionInfo.networkId = LOOM_EXTDEV_NETWORK_ID;
      connectionInfo.writeUrl = LOOM_EXTDEV_WRITE_URL;
      connectionInfo.readUrl = LOOM_EXTDEV_READ_URL;
  
      dispatchConfig(connectionInfo, dispatch);
    }else {
      console.error("Invalid LOOM_NETWORK entry in .env config file");
    }

  }, []);
  
  return connectionInfo;
}


function dispatchConfig(con: LoomConnectionInfo, dispatch: Dispatch){
  dispatch({
    type: ActionType.SET_LOOM_CONNECTION_INFO,
    payload: con
  });
}