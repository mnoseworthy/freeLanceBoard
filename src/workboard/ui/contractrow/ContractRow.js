import React, { Component } from 'react'

class ContractRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
        address: props.address,
        name: props.name,
        type: props.type,
        payout: props.payout,
        status: props.status,
        creationDate: props.creationDate
    }
  }
  // When the row is clicked, navigate to the contract's page
  handleClick(){
    event.preventDefault();
    this.props.onContractRowClick(this.state.address)
  }

  //Render the row containing data for this contract
  render(){
    return(
      <tr onClick={this.handleClick.bind(this)}>
          <td>{this.state.name}</td>
          <td>{this.state.type}</td>
          <td>{this.state.payout}</td>
          <td>{this.state.status}</td>
          <td>{this.state.creationDate}</td>
      </tr>
    )
  }
}

export default ContractRow