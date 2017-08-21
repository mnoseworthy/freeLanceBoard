import request from 'request-json'
import ContractRowContainer from '../contractrow/ContractRowContainer'
import store from '../../../store'
import React from 'react'



// Create JSON client
var client = request.createClient('http://localhost:3001/');

// Dispatch callback action to update contract list in store
export const UPDATE_CONTRACT_LIST = "UPDATE_CONTRACT_LIST"
function updateContractListAction(contracts){
  return {
    type: UPDATE_CONTRACT_LIST,
    payload: contracts
  }
}
// Action called from container to update the contract list via a call to the rest API
export function updateContractList() {
  return function(dispatch){
    let contracts = {}
    //Make database call to get the list of contracts 
    client.get('contract/').then( function(res){
        contracts = res.body
        dispatch(updateContractListAction( contracts)) 
    })
  }
}

// Dispatch callback action to update table rows
export const UPDATE_TABLE_ROWS = "UPDATE_TABLE_ROWS"
function updateTableRowsAction(rows){
  return {
      type: UPDATE_TABLE_ROWS,
      payload: rows
  }
}

// 
export function updateTableRows(){
    return function(dispatch){
        let currentContracts = store.getState().workboard.contractList
        if (currentContracts){
          let rows = []
          for(var i = 0; i < currentContracts.length; i++){
            let contract = currentContracts[i]
            rows.push(<ContractRowContainer key={contract.address} address={contract.address} name={contract.name} type={contract.type} payout={contract.payout} status={contract.status} creationDate={contract.creationDate}/>)
          }
          dispatch(updateTableRowsAction(rows))    
        }
    }
}