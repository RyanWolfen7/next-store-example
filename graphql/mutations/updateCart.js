/* eslint-disable */
import { gql } from '@apollo/client'

const UPDATE_CART = gql`
mutation UpdateCart($data: CartInput!, $updateCartId: ID!) {
  updateCart(data: $data, id: $updateCartId) {
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
        status
      }
    }
  }
}
`

export default UPDATE_CART