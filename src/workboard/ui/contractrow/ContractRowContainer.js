import { connect } from 'react-redux'
import ContractRow from './ContractRow'
import { navigateToContractPage } from './ContractRowActions'

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    contractRowClick: (address) => {
      dispatch(navigateToContractPage(address))
    }
  }
}

const ContractRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractRow)

export default ContractRowContainer
