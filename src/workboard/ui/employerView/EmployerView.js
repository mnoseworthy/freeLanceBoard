import React, { Component } from 'react'

class EmployerView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeContract: this.props.activeContract,
      stage: 'Loading',
      data: this.props.data
    }
  }

  componentDidMount(){
    switch (this.state.stage){
      case 'Loading':
        this.props.loadContractData()
        break;
      default:
        //Should never execute this
        break;
    }
  }

  componentWillReceiveProps(nextProps){
    // Check if the new props involves the data field
    if(nextProps.data !== this.props.data){
      //Update component's stage based on data
      console.log('componentWillRecieveTest')
      console.log(nextProps.data.contractData)
      this.setState({stage : nextProps.data.contractData.stage})
    }else{
      console.log('data has not changed')
    }
    console.log("New props")
    console.log(nextProps)
  }

  render() {
    // Change the interface options based on the current contract stage
    let contract_interface = null;
    console.log(this.state.stage);
    switch (this.state.stage){
      case 'Loading':
        console.log('is Loading')
        contract_interface = <p> Loading... </p>;
        break;
      default:
        console.log(console.log(this.state.stage))
        contract_interface = <p>There is an internal issue with this contract</p>;
    }

    return(
        <div>
          <h1>Employer</h1>
          {contract_interface}
        </div>
    )
  }
}

export default EmployerView
