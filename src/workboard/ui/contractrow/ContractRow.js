import React, { Component } from 'react'

class ContractRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
        address: props.address,
        title: props.title,
        type: props.type,
        payout: props.payout,
        status: props.status,
        creationDate: props.creationDate
    }
  }

  handleRowClick(){
    this.props.contractRowClick(this.state.address)
  }
  
  //Render the row containing data for this contract
  render(){
    return(
      <tr onClick={this.handleRowClick.bind(this)} >
          <td>{this.state.title}</td>
          <td>{this.state.type}</td>
          <td>{this.state.payout}</td>
          <td>{this.state.status}</td>
          <td>{this.state.creationDate}</td>
      </tr>
    )
  }
}

export default ContractRow