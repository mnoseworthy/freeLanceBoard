import WorkContract from '../../../../build/contracts/WorkContract.json'
import store from '../../../store'
import request from 'request-json'

const contract = require('truffle-contract')
// Create JSON client
var client = request.createClient('http://localhost:3001/');

export function createWorkContract(name) {
    // Grab web3 instance from store, handle undefined instance
    console.log(store.getState())
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined'){
        // Validate presence of coinbase address
        web3.eth.getCoinbase((error, coinbase) => {
            if (error){
                console.error(error);
                return
            }
            
            // Can now create the contract using the user's coinbase
            /*
            var newContract = contract(WorkContract)
            newContract.setProvider(web3.currentProvider)
            let gas = Number(4712388)
            newContract.defaults({from:coinbase, gas:gas})
            newContract.new({from:coinbase, gas:gas}).then(function (instance) {
                instance.getEmployer.call().then(function (result){
                    console.log(result);
                })
            })
            */
            
            var newWorkContract = contract(WorkContract)
            newWorkContract.setProvider(web3.currentProvider)
            let gas = Number(4712388)
            newWorkContract.defaults({from:coinbase, gas:gas})
            newWorkContract.new().then(function (instance) {
                console.log("New work contract deployed at : ")
                console.log(instance.address);              
                instance.getEmployer.call().then(function (result){
                    console.log("Employer set as:")
                    console.log(result)
                    console.log("While the user's current coinbase is:")
                    console.log(coinbase)
                })               
            })
            
        })
    } else {
        console.log("Web3 it not initialized, user must be logged in via ethereum network to create a contract.")
    }
}


