const loadCartIdSelector = (state, { payload }) => {
  const cartId = payload.id
  return {...state, cartId}
}

export default loadCartIdSelector
