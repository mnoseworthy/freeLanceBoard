import React, { Component } from 'react'

class ContractRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
        address: props.address,
        name: props.name,
        type: props.type,
        payout: props.payout,
        status: props.status,
        creationDate: props.creationDate
    }
  }

  handleRowClick(event){
    event.preventDefault()
    this.props.contractRowClick(this.state.address)
  }
  
  //Render the row containing data for this contract
  render(){
    return(
      <tr onClick={(event) => this.handleRowClick(event).bind(this)}>
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