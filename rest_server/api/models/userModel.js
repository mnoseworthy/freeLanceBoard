'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    Required: "User must have entered a name on sign-up."
  },
  coinbase: {
    type: String,
    Required: "User must be logged in via Ethereum network, and have a coinbase available."
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  contracts: [{
    address: String,
    role: String
  }]
})

module.exports = mongoose.model("Users", UserSchema)

