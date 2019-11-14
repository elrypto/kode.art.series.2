import React from 'react';
import { Store, ActionType } from '../../common/Store';
import { LoomObject } from '../../common/Interfaces';
import useLoomWithConfig  from './useLoadLoomConfig';
import useLoomEthers from './useLoom';

export default function useLoadLoomObj(){
  const { state, dispatch } = React.useContext(Store);
  const loomObj = useLoomEthers();

  React.useEffect(() => {
   
    console.log("loom obj:", loomObj);
    
  }, [loomObj]);

}