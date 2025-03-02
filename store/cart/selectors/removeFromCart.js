import { current } from '@reduxjs/toolkit'
import { getCouponProductRelationSlugs } from '../../../utils/qglParsers/coupon'

const removeFromCartSelector = (state, { payload }) => {
  const cart = current(state.cart)
  const coupons = state.coupons ? current(state.coupons) : []
  const updatedCart = cart.filter(product => product.slug != payload.slug)
  const updatedCoupons = coupons.reduce((array, coupon, index) => {
    if (index === 0) { { array.push(coupon) } }
    const couponRelations = getCouponProductRelationSlugs(coupon)
    const inCart = updatedCart.some(product => (couponRelations.includes(product.slug)))
    if (inCart) { array.push(coupon) }
    return array
  }, [])
  
  return {...state, cart: updatedCart, coupons: updatedCoupons}
}

export default removeFromCartSelector
