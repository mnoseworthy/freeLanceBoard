import { connect } from 'react-redux'
import EmployerView from './EmployerView'
import { getContractData } from './EmployerViewActions'

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

const EmployerViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerView)

export default EmployerViewContainer
