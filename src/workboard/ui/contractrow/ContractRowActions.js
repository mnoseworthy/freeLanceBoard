import { browserHistory } from 'react-router'


export const CHANGE_ACTIVE_CONTRACT = "CHANGE_ACTIVE_CONTRACT"
function activeContract(address) {
  return {
    type: CHANGE_ACTIVE_CONTRACT,
    payload: address
  }
}

export function navigateToContractPage(address) { 
    return function(dispatch){
        dispatch(activeContract(address))
        browserHistory.push('/contractpage')
    }
    
}