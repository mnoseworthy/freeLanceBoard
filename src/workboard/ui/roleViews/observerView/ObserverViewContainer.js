import { connect } from 'react-redux'
import ObserverView from './ObserverView'
import { getContractData } from './ObserverViewActions'

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

const ObserverViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ObserverView)

export default ObserverViewContainer
