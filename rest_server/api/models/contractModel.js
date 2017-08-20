'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContractSchema = new Schema({
  address: {
    type: String,
    Required: "The contract must have an address."
  },
  name: {
    type: String,
    Required: "The contract must have a title"
  },
  type: {
      type: String,
      enum: ['Work', 'Review'],
      Required: "The contract must have a type."
  },
  payout: {
      type: Number,
      default: 0
  },
  status: {
      type: String,
      enum: [
        'AcceptingOffers',
        'ReviewContract',
        'GatheringDeposits',
        'AwaitingJobCompletion',
        'Finalize',
        'UnderReview',
        'Finished'
      ],
      required: "The contract must have a status"
  },
  creationDate: {
    type: Date,
    Required: "The contract must have been created at some date"
  }
})

module.exports = mongoose.model("Contracts", ContractSchema)

