/* eslint-disable */
import { gql } from '@apollo/client'

const CREATE_CART = gql`
mutation CreateCart($data: CartInput!) {
  createCart(data: $data) {
    data {
      id
      attributes {
        cartCoupons {
          id
        }
        cartItems {
          classes {
            data {
              id
            }
          }
          books {
            data {
              id
            }
          }
          memberships {
            data {
              id
            }
          }
        }
        userName
        userEmail
        publishedAt
      }
    }
  }
}
`

export default CREATE_CART