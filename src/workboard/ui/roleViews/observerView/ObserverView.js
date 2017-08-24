import React, { Component } from 'react'

class ObserverView extends Component {
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
      this.setState({stage : nextProps.data.contractData.stage})
    }else{
      console.log('data has not changed')
    }
  }

  render() {
    // Change the interface options based on the current contract stage
    let contract_interface = null;
    switch (this.state.stage){
      case 'Loading':
        contract_interface = <p> Loading... </p>;
        break;
      case 'AcceptingOffers':
        contract_interface = <p> AcceptingOffers </p>;
        break;
      case 'ReviewContract':
        contract_interface = <p> ReviewContract </p>;
        break;
      case 'GatheringDeposits':
        contract_interface = <p> GatheringDeposits </p>;
        break;
      case 'AwaitingJobCompletion':
        contract_interface = <p> AwaitingJobCompletion </p>;
        break;
      case 'Finalize':
        contract_interface = <p> Finalize </p>;
        break;
      case 'UnderReview':
        contract_interface = <p> UnderReview </p>;
        break;
      case 'Finished':
        contract_interface = <p> Finished </p>;
        break;
      default:
        console.log(console.log(this.state.stage))
        contract_interface = <p>There is an internal issue with this contract</p>;
    }

    return(
        <div>
          <h1>Observer</h1>
          {contract_interface}
        </div>
    )
  }
}

export default ObserverView
