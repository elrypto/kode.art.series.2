import React from "react";
import { CryptoUtils, Client, LoomProvider, LocalAddress } from "loom-js";
import { LoomConnectionInfo, LoomObject } from "../../common/Interfaces";
import { ethers } from 'ethers';
import { Store } from "../../common/Store";


/* based on loom truffle example, contract.js file, adapted to react hooks
   https://github.com/loomnetwork/truffle-dappchain-example/blob/master/src/contract.js
*/

//default connection to local, if nothing is passed in
export const DEFAULT_LOCAL_DEV = {
  networkAlias: "DEFAULT_LOCAL_DEV",
  writeUrl: "ws://127.0.0.1:46658/websocket",
  readUrl: "ws://127.0.0.1:46658/queryws",
  networkId: "default"
};


export default function useLoom2() {
  const { state } = React.useContext(Store);
  let connectionInfo: LoomConnectionInfo = {} as LoomConnectionInfo;

  if (!state.loomConnectionInfo) {
    connectionInfo = DEFAULT_LOCAL_DEV;
  }

  let loomObj: LoomObject = {
    contract: null,
    connectionInfo: {} as LoomConnectionInfo,
    client: {} as Client,
    privateKey: {} as Uint8Array,
    publicKey:  {} as Uint8Array,
    web3: {} as ethers.providers.Web3Provider,
    currentNetwork: '',
    currentUserAddress: ''    
  };


  React.useEffect(() => {
    loomObj.connectionInfo = connectionInfo;
       const initialize = async () => {
        await createClient();
        loomObj.currentUserAddress = LocalAddress.fromPublicKey(
          loomObj.publicKey
        ).toString();

      let loomProvider = new LoomProvider(loomObj.client, loomObj.privateKey);
      loomObj.web3 = new ethers.providers.Web3Provider(loomProvider);
    };

    if (state.loomConnectionInfo){
      initialize();
    }
  }, [state.loomConnectionInfo]);



  /* returning if they are looking for a response */
  return loomObj;

  async function createClient() {
    loomObj.privateKey = CryptoUtils.generatePrivateKey();
    loomObj.publicKey = CryptoUtils.publicKeyFromPrivateKey(loomObj.privateKey);
    console.log('loom obj:', loomObj);
    
    loomObj.client = new Client(
      loomObj.connectionInfo.networkId,
      loomObj.connectionInfo.writeUrl,
      loomObj.connectionInfo.readUrl
    );

    console.log('loom obj:', loomObj);

    /*
    loomObj.client.on("error", (msg: any) => {
      console.error("Error on connect to client", msg);
      console.warn("Please verify if loom command is running");
    });*/
  }

}



/*
  async function createContractInstance() {
    const networkId = await getCurrentNetwork();
    Loom.currentNetwork = Loom.contract.networks[networkId];
    //console.log("network:", Loom.currentNetwork);

    if (!Loom.currentNetwork) {
      console.error(
        "not a valid network: , network id was:",
        Loom.currentNetwork,
        networkId
      );
      throw Error("Contract not deployed on DAppChain (network id error)");
    }

    Loom.instance = new Loom.web3.eth.Contract(
      Loom.contract.abi,
      Loom.currentNetwork.address,
      {
        from: Loom.currentUserAddress
      }
    );
  }*/