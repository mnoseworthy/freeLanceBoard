import { browserHistory } from 'react-router'
import store from '../../../store'
export const USER_LOGGED_IN = 'USER_LOGGED_IN'

export const CHANGE_ACTIVE_CONTRACT = "CHANGE_ACTIVE_CONTRACT"
function activeContract(address) {
  return {
    type: CHANGE_ACTIVE_CONTRACT,
    payload: address
  }
}

export function navigateToContractPage(address) {
    return function(dispatch){
        dispatch(activeContract({"address": address}))
        return browserHistory.push('/contractpage')
    }
    
}