import WorkContract from '../../../../../build/contracts/WorkContract.json'
import { stage_map, status_map } from '../../../../util/mappings/WorkContractMappings.js'
import store from '../../../../store'
import request from 'request-json'
import { browserHistory } from 'react-router'
import BigNumber from 'bignumber'

const contract = require('truffle-contract')
// Create JSON client
var client = request.createClient('http://localhost:3001/');

// Dispatch function
export const UPDATE_CONTRACT_PAGE = "UPDATE_CONTRACT_PAGE"
function updateContractPage(data) {
  return {
    type: UPDATE_CONTRACT_PAGE,
    payload: data
  }
}


// Get contract data from database and from the contract itself
// Use this as a chance to validate the database
// Return the validated combination to update the contract page
//
// TODO: sync the database call as well
export function getContractData(){
    return function(dispatch){
        // Get contract address from store
        let address = store.getState().workboard.activeContract.address

        // Get contract data from database
        let dbData
        client.get('/contract/'+address, function(err, res){
            if(err)
                console.error(err)
            dbData = res.body
        })

        // Grab web3 instance from store, handle undefined instance
        let web3 = store.getState().web3.web3Instance
        let contractData = {
            participants: null,
            stage: null,
            status: null,
            contract_acceptance: null,
            work_acceptance: null
        }
        if (typeof web3 !== 'undefined'){
            // Access the contract on the network at the active address
            var newWorkContract = contract(WorkContract)
            newWorkContract.setProvider(web3.currentProvider)
            newWorkContract.at(address).then(function (instance) {
                // Create a promise and resolve only when all functions have returned their values
                var fetch = new Promise(function(resolve, reject){
                    let responses = 0           
                    // Get participants
                    instance.getParticipants.call().then(function (result){
                        contractData.participants = result
                        responses ++
                        if(responses === 5)
                            resolve()
                    })
                    // Get Stage
                    instance.getStage.call().then(function (result){
                        contractData.stage = stage_map[result.toNumber()]
                        responses ++
                        if(responses === 5)
                            resolve()                      
                    })
                    // Get status
                    instance.getStatus.call().then(function (result){
                        contractData.status = status_map[result.toNumber()]
                        responses ++
                        if(responses === 5)
                            resolve()
                    })
                    // Get contract acceptance
                    instance.getContractAcceptance.call().then(function (result){
                        contractData.contract_acceptance = result
                        responses ++
                        if(responses === 5)
                            resolve()
                    })
                    // Get work acceptance
                    instance.getWorkAcceptance.call().then(function (result){
                        contractData.work_acceptance = result
                        responses ++
                        if(responses === 5)
                            resolve()
                    })
                }).then(function (){
                    dispatch(updateContractPage({dbData: dbData, contractData: contractData}))
                })
            })
        }
    }
}