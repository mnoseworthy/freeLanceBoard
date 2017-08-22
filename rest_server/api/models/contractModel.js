'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContractSchema = new Schema({
  address: {
    type: String,
    Required: "The contract must have an address."
  },
  employer: {
    type: String,
    Required: "The contract must have an owner..."
  },
  worker: {
    type: String
  },
  reviewers: {
    type: [String]
  },
  title: {
    type: String,
    Required: "The contract must have a title"
  },
  description: {
    type: String,
    Required: "The contract must have a description"
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
    default: Date.now
  }
})

module.exports = mongoose.model("Contracts", ContractSchema)

