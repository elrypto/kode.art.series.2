export async function createContractInstance(Loom, contract) {
  const networkId = await getCurrentNetwork(Loom);
  
  Loom.currentNetwork = contract.networks[networkId];
  //console.log("network:", Loom.currentNetwork);

  if (!Loom.currentNetwork) {
    console.error(
      "not a valid network: , network id was:",
      Loom.currentNetwork,
      networkId
    );
    throw Error("Contract not deployed on DAppChain (network id error)");
  }

  let contractInstance = new Loom.web3.eth.Contract(
    contract.abi,
    Loom.currentNetwork.address,
    {
      from: Loom.currentUserAddress
    }
  );

  return contractInstance;
}

export async function getCurrentNetwork(Loom) {
  return await Loom.web3.eth.net.getId();
}