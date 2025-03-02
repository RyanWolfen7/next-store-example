const registerSelector = (state, { payload }) => {
  const user = {...state.user}
  if (payload && payload.token) {
    const { user_email, display_name } = payload.user.data
    user.email = user_email
    user.name = display_name
    user.token = payload.token
  }
  
  user.isLoading = false
  user.code = payload
  user.error = payload?.message
  return {...state, user}
}

export default registerSelector
