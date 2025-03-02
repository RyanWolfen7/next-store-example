const addToCartSelector = (state, { payload }) => {
  let cart = [...state.cart]
  const isInCart = cart.find(product => product.slug === payload.slug)

  // update cart when user change membership pricing
  if (payload.__typename === 'Membership' && isInCart) {
    cart = cart.map(prod => {
      return prod.slug === payload.slug ? {...payload} : prod
    })
    return {...state, cart}
  }

  if (isInCart) {
    alert('You already have this in your cart')
    return {...state, cart}
  }
  
  cart.push(payload)
  return {...state, cart}
}

export default addToCartSelector
