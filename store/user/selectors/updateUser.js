const updateUserSelector = (state, { payload }) => {
  let user = {...state.user}
  user = payload
  return {...state, user}
}

export default updateUserSelector
