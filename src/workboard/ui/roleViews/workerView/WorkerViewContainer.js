import { connect } from 'react-redux'
import WorkerView from './WorkerView'
import { getContractData } from './WorkerViewActions'

//import {  } from './ContractRowActions'

const mapStateToProps = (state, ownProps) => {
  return {
    activeContract: state.workboard.activeContract,
    data: state.workboard.contractPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadContractData: () => {
      dispatch(getContractData())
    }
  }
}
const WorkerViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkerView)

export default WorkerViewContainer
