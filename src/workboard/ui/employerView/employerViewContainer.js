import { connect } from 'react-redux'
import EmployerView from './EmployerView'

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

const EmployerViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerView)

export default EmployerViewContainer
