import { browserHistory } from 'react-router'
import request from 'request-json'
import store from '../../../store'

// Create JSON client
var client = request.createClient('http://localhost:3001/');

export const CHANGE_ACTIVE_CONTRACT = "CHANGE_ACTIVE_CONTRACT"
function activeContract(contract_data) {
  return {
    type: CHANGE_ACTIVE_CONTRACT,
    payload: contract_data
  }
}

export function navigateToContractPage(address) { 
    return function(dispatch){
        // Make object to pass to dispatch with inital values
        let contract_data = {address: address, users_role: 'Observer'};
        // If user is logged in via a web3 instance...
        let web3 = store.getState().web3.web3Instance;
        if (typeof web3 !== 'undefined') {
            // Validate presence of coinbase address
          web3.eth.getCoinbase((error, coinbase) => {
            if (error){
              console.error(error);
              return
            }                  
            // Get current user's data from database
            client.get('/user/'+coinbase).then(function (res){
              // Get contracts from data
              let contracts = res.body.contracts;
              // Check for current contract in user's data
              for(var i = 0; i < contracts.length; i ++){
                let contract = contracts[i];
                // If found, store user's role in the contract and navigate to contract page
                if(contract.address === address){
                  contract_data.users_role = contract.role
                  dispatch(activeContract(contract_data))
                  browserHistory.push('/contractpage')
                }
              }
            })
          })
        }else{
          // Dispatch the data and nav to the contract page 
          dispatch(activeContract(contract_data))
          browserHistory.push('/contractpage')
        }
    }
    
}