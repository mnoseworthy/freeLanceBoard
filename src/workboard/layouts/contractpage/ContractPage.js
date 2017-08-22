/*
*
*/
import React, { Component } from 'react'
import store from '../../../store'
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../../../util/wrappers.js'
import ObserverViewContainer from '../../ui/observerView/ObserverViewContainer'
import EmployerViewContainer from '../../ui/employerView/EmployerViewContainer'
import WorkerViewContainer from '../../ui/workerView/WorkerViewContainer'
import ReviewerViewContainer from '../../ui/reviewerView/ReviewerViewContainer'

class ContractPage extends Component {
  render() {
  let OnlyAuthDoms = VisibleOnlyAuth(() =>
    <div>
      <EmployerViewContainer />
      <WorkerViewContainer />
      <ReviewerViewContainer />
    </div>
  )
  let OnlyGuestDoms = HiddenOnlyAuth(() =>
    <div>
      <ObserverViewContainer />
    </div>
  )
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
          <OnlyAuthDoms />
          <OnlyGuestDoms />
          </div>
        </div>
      </main>
    )
  }
}

export default ContractPage
