import WorkContract from '../../../../build/contracts/WorkContract.json'
import store from '../../../store'
import request from 'request-json'

const contract = require('truffle-contract')
// Create JSON client
var client = request.createClient('http://localhost:3001/');

// Dispatch function
export const CHANGE_ACTIVE_CONTRACT = "CHANGE_ACTIVE_CONTRACT"
function activeContract(address) {
  return {
    type: CHANGE_ACTIVE_CONTRACT,
    payload: address
  }
}

export function createWorkContract(state) {
    return function(dispatch){
        // Grab web3 instance from store, handle undefined instance
        let web3 = store.getState().web3.web3Instance
        if (typeof web3 !== 'undefined'){
            // Validate presence of coinbase address
            web3.eth.getCoinbase((error, coinbase) => {
                if (error){
                    console.error(error);
                    return
                }
                
                // Create the new contract 
                var newWorkContract = contract(WorkContract)
                newWorkContract.setProvider(web3.currentProvider)
                newWorkContract.defaults({from:coinbase, gas:Number(4712388)})
                newWorkContract.new().then(function (instance) 
                {

                        // Update active contract via dispatch
                        dispatch(activeContract(instance.address))

                        // Add new contract to database
                        let contractJSON = {
                            address:instance.address,
                            employer:coinbase,
                            title:state.title,
                            description:state.description,
                            type:"Work",
                            payout:state.payout,
                            status:"AcceptingOffers"
                        }
                        client.post('contract/', contractJSON, function(err, res, body){
                            if(err)
                                console.error(err)
                            return console.log(res.statusCode)
                        }) 
                        
                        // Add contract to user's list
                        client.post('user/'+coinbase, {"contracts":{address: instance.address, role: "Employer"}}, function (err, res, body){
                            if(err)
                                console.error(err)
                            return console.log(res.statusCode)
                        })

                })

                // Add new contract to database, and user's contract's


                // Update active contract and move user to the contract page
                dispatch(activeContract())
                
            })
        } else {
            console.log("Web3 it not initialized, user must be logged in via ethereum network to create a contract.")
        }
    }
}


