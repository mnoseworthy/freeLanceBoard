const initialState = {
  data: null
}


const workBoardReducer = (state = initialState, action) => {
  if (action.type === 'CHANGE_ACTIVE_CONTRACT')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default workBoardReducer
