import React, { Component } from 'react'
import ContractTableContainer from '../../ui/contracttable/ContractTableContainer'
import ContractFormContainer from '../../ui/contractform/ContractFormContainer'

class Workboard extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Workboard</h1>
            <p>This page contains all the work contracts that have been created.</p>
            <ContractTableContainer />

            <br />

            <ContractFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Workboard
