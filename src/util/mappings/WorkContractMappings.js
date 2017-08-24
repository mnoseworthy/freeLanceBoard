/*
*   Enum's in Solidity are returned as a BigNumber, not their value converted into
*   a properly readable string. In order to make code more readable, the bignumber
*   mappings are defined here to resolve them into descriptive strings.
*
*   Each mapping is an array, which is an easy way to map the ints to strings.
*/
import React from 'react'

export const stage_map = [
    'AcceptingOffers',
    'ReviewContract',
    'GatheringDeposits',
    'AwaitingJobCompletion',
    'Finalize',
    'UnderReview',
    'Finished'
];

export const status_map = [
    'Active',
    'Successful',
    'Revoked',
    'Disputed'
];