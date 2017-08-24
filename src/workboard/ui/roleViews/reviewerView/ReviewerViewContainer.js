import { connect } from 'react-redux'
import ReviewerView from './ReviewerView'

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

const ReviewerViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewerView)

export default ReviewerViewContainer
