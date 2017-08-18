import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import { loginUser } from '../loginbutton/LoginButtonActions'
import store from '../../../store'
import request from 'request-json'

const contract = require('truffle-contract')
// Create JSON client
var client = request.createClient('http://localhost:3001/');

export function signUpUser(name) {
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

          // Attempt to sign up user.
          authenticationInstance.signup(name, {from: coinbase})
          .then(function(result) {
            // If no error, Add user to database
            client.post('user', {name: name, coinbase: coinbase}, function(err, res, body){
              return console.log(res.statusCode)
            }) 
            // If no error, login user.
            return dispatch(loginUser())

          })
          .catch(function(result) {
            // If error...
            console.error('Error creating account.')
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
