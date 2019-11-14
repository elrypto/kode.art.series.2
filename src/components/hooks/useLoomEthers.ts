import React from "react";
import { CryptoUtils, Client, LoomProvider, LocalAddress, EthersSigner } from "loom-js";
import { LoomConnectionInfo, LoomObject } from "../../common/Interfaces";
import { ethers } from 'ethers';


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


export default function useLoom(connectionInfo: LoomConnectionInfo) {
  const [loom, setLoom] = React.useState<LoomObject>({} as LoomObject);

  if (!connectionInfo) {
    connectionInfo = DEFAULT_LOCAL_DEV;
  }

  let loomObj: LoomObject = {
    contract: null,
    connectionInfo: {} as LoomConnectionInfo,
    client: {} as Client,
    privateKey: {} as Uint8Array,
    publicKey:  {} as Uint8Array,
    ethersProvider: null,
    currentNetwork: '',
    currentUserAddress: ''    
  };

  React.useEffect(() => {
    
    loomObj.connectionInfo = connectionInfo;

    //console.log("useLoom.useEffect([])");
    // console.log("useLoom with contract:", Loom.contract);
    // console.log("useLoom with connectionInfo:", Loom.connectionInfo);

    const initialize = async () => {
      //console.log("useLoom.useEffect([]).initialize()");
      await createClient();
      loomObj.currentUserAddress = LocalAddress.fromPublicKey(
        loomObj.publicKey
      ).toString();

      let loomProvider = new LoomProvider(loomObj.client, loomObj.privateKey);
      //loomObj.web3 = new Web3(loomProvider);
      loomObj.ethersProvider = new ethers.providers.Web3Provider(loomProvider);
      
      setLoom(loomObj);
    };

    if (!loom){
      initialize();
    }
  }, []);



  async function createClient() {
    loomObj.privateKey = CryptoUtils.generatePrivateKey();
    loomObj.publicKey = CryptoUtils.publicKeyFromPrivateKey(loomObj.privateKey);
    loomObj.client = new Client(
      loomObj.connectionInfo.networkId,
      loomObj.connectionInfo.writeUrl,
      loomObj.connectionInfo.readUrl
    );

    loomObj.client.on("error", (msg: any) => {
      console.error("Error on connect to client", msg);
      console.warn("Please verify if loom command is running");
    });
  }

  async function getCurrentNetwork() {
    return await loomObj.web3.eth.net.getId();
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