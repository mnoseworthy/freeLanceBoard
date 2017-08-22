import { connect } from 'react-redux'
import WorkerView from './WorkerView'

//import {  } from './ContractRowActions'

const mapStateToProps = (state, ownProps) => {
  return {
    address: state.workboard.activeContract
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const WorkerViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkerView)

export default WorkerViewContainer
