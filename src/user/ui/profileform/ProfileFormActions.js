import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import store from '../../../store'
import request from 'request-json'
const contract = require('truffle-contract');

// Create JSON client
var client = request.createClient('http://localhost:3001/');


export const USER_UPDATED = 'USER_UPDATED'
function userUpdated(user) {
  return {
    type: USER_UPDATED,
    payload: user
  }
}

export function updateUser(name) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract)
      authentication.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        authentication.deployed().then(function(instance) {
          authenticationInstance = instance

          // Attempt to login user.
          authenticationInstance.update(name, {from: coinbase})
          .then(function(result) {
            // If no error, update user in store and database
            client.post('user/'+coinbase, {name: name}, function(err, res, body){
              return console.log(res.statusCode)
            }) 
            dispatch(userUpdated({"name": name}))

            return console.log('Name updated!')
          })
          .catch(function(result) {
            // If error...
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}