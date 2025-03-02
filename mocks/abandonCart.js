/* eslint-disable */
import { gql } from '@apollo/client'

const FIRE_ABANDONED_CART = gql`
  mutation createCart(
    $userName: String
    $userEmail: String
    $cartItems: ComponentCartCartItemsInput
    $cartCoupons: [ComponentCartCartCouponsInput]
    $status: String
  ){
    data(
      cartItems: $cartItems
      cartCoupons: $cartCoupons
      status: "abandoned"
      userName: $userName 
      userEmail: $userEmail
    ) {
      cartItems
      cartCoupons
      userName
      userEmail
      status
    }
}
`

export default FIRE_ABANDONED_CART

