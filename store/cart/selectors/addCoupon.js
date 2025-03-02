import { getCouponProductRelationSlugs } from '../../../utils/qglParsers/coupon'

const addCouponSelector = (state, { payload }) => {
  const coupons = [...state.coupons]
  const cart = [...state.cart]
  if (coupons.find(coupon => coupon.code === payload.code)) {
    alert('You already applied this coupon')
    return {...state, coupons}
  }
  const couponRelations = getCouponProductRelationSlugs(payload)
  const inCart = cart.some(product => (couponRelations.includes(product.slug)))
  if (!inCart) {
    alert("You don't have the associated coupon in your cart") // we can add it to the cart here
    return {...state, coupons}
  }
  coupons.push(payload)
  const updatedCart = cart.map(product => {
    const data = {...product}
    if (couponRelations.includes(product.slug)) {
      const { discount, discountType } = payload
      let discountOff
      data.isDiscounted = true
      if (discountType == 'percent') {
        discountOff = product.price * (1 - (discount / 100))
        discountOff = discountOff ? discountOff : product.price
        data.discount = `- $${discountOff} (${discount}% off)`
        data.discountedPrice = Math.floor(product.price - discountOff)
      }
      if ((discountType == 'fixed')) {
        data.discount =`- $${discount}`
        data.discountedPrice = Math.floor(product.price - discount)
      }
    }
    return data
  })
  return {...state, coupons, cart: updatedCart}
}

export default addCouponSelector
