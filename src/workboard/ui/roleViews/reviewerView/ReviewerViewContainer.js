import { connect } from 'react-redux'
import ReviewerView from './ReviewerView'
import { getContractData } from './ReviewerViewActions'

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

const ReviewerViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewerView)

export default ReviewerViewContainer
