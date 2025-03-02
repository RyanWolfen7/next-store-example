import { createSlice } from '@reduxjs/toolkit'
import {
  addToCartSelector,
  removeFromCartSelector,
  addCouponSelector,
  removeCouponSelector,
  restoreCartSelector,
  loadCartIdSelector
} from './selectors'

const initialState = {
  cart: [],
  cartId: -1,
  coupons: [
    { id: null, code: null } // pre renders with one blank coupon in state
  ],
  subtotal: 0.00
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: addToCartSelector,
    removeFromCart: removeFromCartSelector,
    addCoupon: addCouponSelector,
    removeCoupon: removeCouponSelector,
    restoreCart: restoreCartSelector,
    loadCartId: loadCartIdSelector
  }
})
  
// Action creators are generated for each case reducer function
export const { 
  addToCart,
  addCoupon, 
  removeCoupon,
  removeFromCart,
  restoreCart,
  loadCartId
} = cartSlice.actions

export default cartSlice.reducer
