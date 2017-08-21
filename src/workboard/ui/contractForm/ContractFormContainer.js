import { connect } from 'react-redux'
import ContractForm from './ContractForm'
import { createWorkContract } from './ContractFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpFormSubmit: (name) => {
      event.preventDefault();
      createWorkContract(name)
    }
  }
}

const ContractFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractForm)

export default ContractFormContainer
