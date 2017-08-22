import React, { Component } from 'react'
import ContractFormContainer from '../../ui/contractform/ContractFormContainer'

class CreateContract extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Create a new work contract</h1>
            <ContractFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default CreateContract
