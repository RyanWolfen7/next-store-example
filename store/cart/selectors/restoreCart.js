const restoreCartSelector = (state, { payload }) => {
  let cart = [...state.cart]
  const keys = ['classes', 'indicators', 'memberships']
  if (!state.cartId || state.cartId == -1 ) {
    cart = []

    keys.map(value => {
      payload.attributes.cartItems[value].data.map((product) => cart.push(product))
    })
  }

  return {...state, cart}
}

export default restoreCartSelector
