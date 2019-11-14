import React from 'react';
import { Store, ActionType } from '../../common/Store';
import { LoomObject } from '../../common/Interfaces';
import useLoomWithConfig  from './useLoadLoomConfig';

export default function useLoadLoomObj(){
  const { dispatch } = React.useContext(Store);
  const loomObj = useLoomWithConfig();

  React.useEffect(() => {
    if (loomObj){
      console.log("have loom obj for extdev", loomObj);
      
      dispatch({
        type: ActionType.SET_LOOM_OBJ,
        payload: loomObj
      });

      /*  if (loomObj && loomObj.currentUserAddr){
        dispatch({
          type: ActionType.SET_LOOM_USER_ADDR,
          payload: currentUserAddr
        })
      }
      */
    }
  }, [loomObj]);

}