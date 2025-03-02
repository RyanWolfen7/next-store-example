import { current } from '@reduxjs/toolkit'
import { getCouponProductRelationSlugs } from '../../../utils/qglParsers/coupon'

const removeCouponSelector = (state, { payload }) => {
  const coupons = [...state.coupons]
  const cart = current(state.cart)
  const couponRelations = getCouponProductRelationSlugs(payload)
  const updatedCart = cart.map(product => { 
    const data = {...product}
    if (couponRelations.includes(product.slug)) {
      delete data.isDiscounted
      delete data.discount
      delete data.discountedPrice 
    }
    return data
  })
  const updatedCoupons = coupons.filter(coupon => coupon.code != payload.code)
  return {...state, coupons: updatedCoupons, cart: updatedCart}
}

export default removeCouponSelector
