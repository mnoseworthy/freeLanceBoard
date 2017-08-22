import { connect } from 'react-redux'
import ObserverView from './ObserverView'

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

const ObserverViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ObserverView)

export default ObserverViewContainer
