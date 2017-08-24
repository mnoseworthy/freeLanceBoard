const initialState = {
  contractList: null,
  contractRows: null,
  activeContract: null,
  contractPage: null
}


const workBoardReducer = (state = initialState, action) => {
  if (action.type === 'CHANGE_ACTIVE_CONTRACT')
  {
    return Object.assign({}, state, {
      activeContract: action.payload
    })
  }
  if (action.type === 'UPDATE_CONTRACT_LIST')
  {
    return Object.assign({}, state, {
      contractList: action.payload
    })
  }
  if (action.type === 'UPDATE_TABLE_ROWS')
  {
    return Object.assign({}, state, {
      contractRows: action.payload
    })
  }
  if (action.type === 'UPDATE_CONTRACT_PAGE')
  {
    return Object.assign({}, state, {
      contractPage: action.payload
    })
  }
  return state
}

export default workBoardReducer
