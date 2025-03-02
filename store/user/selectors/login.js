const loginSelector = (state, { payload }) => {
  const user = {...state.user}
  if (payload && payload.token) {
    return {...state, user: payload}
  }
  user.isLoading = false
  user.error = payload
  return {...state, user}
}

export default loginSelector
