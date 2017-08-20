import { connect } from 'react-redux'
import ContractTable from './ContractTable'
import { updateContractList, updateTableRows } from './ContractTableActions'

const mapStateToProps = (state, ownProps) => {
  return {
    contractList: state.workboard.contractList,
    contractRows: state.workboard.contractRows
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContracts: () => {
      dispatch(updateContractList())
    },
    contractsUpdated: (currentContracts) => {
      dispatch(updateTableRows(currentContracts))
    } 
  }
}

const ContractTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractTable)

export default ContractTableContainer
