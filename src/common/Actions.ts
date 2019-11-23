import _ from "lodash";
import { toast } from "react-toastify";
import Axios from "axios";
import { LoomObject } from "./Interfaces";
import { ethers } from "ethers";



export const notify = (msg: string, success?: boolean) => {
  !success ? toast(msg) : toast.success(msg, { autoClose: false });
};


export const notifyError = (msg: string) => {
  toast.error(msg, { autoClose: false });
};


export const notifyWarn = (msg: string) => {
  if (!toast.isActive("nfId")) {
    toast.warn(msg, { toastId: "nfId" });
  }
};

/*
  direct return
*/
export const rpcStatus = async():Promise<boolean> => {
  try{
    const result = await Axios.get('/api/v1/projects');
    return true;
  }catch (error){
    console.error("Could not connect to server on rpc check");
    return false;
  }
}


export const createLoomContractInstance = async(loom: LoomObject, contract: any) => {
  const network = await loom.web3.getNetwork();
  console.log('nework', network);
  loom.currentNetwork = contract.networks[network.chainId];

  if (!loom.currentNetwork) {
    console.error(
      "not a valid network: , network id was:",
      loom.currentNetwork,
      network.chainId
    );
    throw Error("Contract not deployed on DAppChain (network id error)");
  }

  //let c = new ethers.Contract(loom.currentNetwork.address, contract, loom.web3);

/*
  let c = new loom.web3.Contract(
    loom.contract.abi,
    //loom.currentNetwork.address,
    loom.currentNetwork.address,
    {
      from: loom.currentUserAddress
    }
  );*/
}

