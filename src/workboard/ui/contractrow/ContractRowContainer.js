import { connect } from 'react-redux'
import ContractRow from './ContractRow'
import { navigateToContractPage } from './ContractRowActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onContractRowClick: (event) => {
      event.preventDefault();
      dispatch(navigateToContractPage(this.address))
    }
  }
}

const ContractRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractRow)

export default ContractRowContainer
