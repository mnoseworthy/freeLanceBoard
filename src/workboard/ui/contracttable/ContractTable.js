import React, { Component } from 'react'

class ContractTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
        contractList: this.props.contractList,
        contractRows: this.props.contractRows
    }
  }

  componentWillMount(){
    // Fire event to fetch contracts and store in state
    this.props.fetchContracts()
  }

  componentWillUpdate(nextProps, nextState){
    if(nextProps.contractList !== this.props.contractList){
      this.props.contractsUpdated(this.props.contractList)
      return false
    }
    else if(nextProps.contractRows !== this.props.contractRows){
      return true
    }
  }


  //Render the row containing data for this contract
  render(){ 
    return(
      <div>
      <table>
          <thead>
            <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Payout</th>
                <th>Status</th>
                <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {this.props.contractRows}
          </tbody>
      </table>
        
      </div>
    );
  }
}

export default ContractTable
