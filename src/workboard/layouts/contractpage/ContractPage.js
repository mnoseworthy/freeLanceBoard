/*
*
*/
import React, { Component } from 'react'
import store from '../../../store'
import ObserverViewContainer from '../../ui/observerView/ObserverViewContainer'
import EmployerViewContainer from '../../ui/employerView/EmployerViewContainer'
import WorkerViewContainer from '../../ui/workerView/WorkerViewContainer'
import ReviewerViewContainer from '../../ui/reviewerView/ReviewerViewContainer'

class ContractPage extends Component {
  render() {
    const users_role = store.getState().workboard.activeContract.users_role;
    let contractView = null;
    switch (users_role){
      case 'Employer':
        contractView = <EmployerViewContainer />
        break;
      case 'Worker':
        contractView = <WorkerViewContainer />
        break;
      case 'Reviewer':
        contractView = <ReviewerViewContainer />
        break;
      case 'Observer':
        contractView = <ObserverViewContainer />
        break;
      default:
        console.log('Oops looks like the user wasnt meant to come here?')
        contractView = <p>Oops, you shouldn't be here</p>;
    }
 
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            {contractView}
          </div>
        </div>
      </main>
    )
  }
}

export default ContractPage
