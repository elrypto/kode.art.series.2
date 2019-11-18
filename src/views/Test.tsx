import React from 'react'
import { Button } from 'antd';
import useInjectedWeb3 from '../components/hooks/useInjectedWeb3';
import { Store } from '../common/Store';
import useLoadInjectedWeb3State from '../components/hooks/useLoadInjectedWeb3State';
import useLoadLoomObj from './../components/hooks/useLoadLoomObj';
import { LoomObject } from '../common/Interfaces';
import Web3 from 'web3';
import { notify } from '../common/Actions';
import useLoadLoomConfig from '../components/hooks/useLoadLoomConfig';
import useLoom from '../components/hooks/useLoom';
import { ethers } from 'ethers';


export default function Test() {
  const { state, dispatch } = React.useContext(Store);
  useInjectedWeb3();
  useLoadInjectedWeb3State();
  useLoadLoomConfig();
  useLoom();

  console.log("config from state", state.loomConnectionInfo);
  
  return (
    <div className="offset">
      <div className="jumbotron">
        <div className="narrow">
          <div className="col-12">
            <h3 className="heading text-center">==--* test  +___=-`</h3>
            <div className="heading-underline"></div>
           

            <div>Ethereum</div>
            <div className="row seeMe"> 
              <div className="col-md-8">
                Address
              </div>
              <div className="col-md-4">
                Balance
              </div>
            </div>
            <div className="row seeMe"> 
              <div className="col-md-8">
                {state.selectedEthAddr}
              </div>
              <div className="col-md-4">
                 b
              </div>
            </div>


            <div>Loom</div>
            <div className="row seeMe"> 
             <Button
              type="dashed"
              onClick={async() => {
                let l: LoomObject = state.loomObj;
                console.log(l);
                let w3: ethers.providers.Web3Provider = l.web3;
                console.log(w3);
                let bh = await w3.getBlockNumber();
                notify('current block height:' + bh);
              }}
             >
               Blockheight Test
             </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
