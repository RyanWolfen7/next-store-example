import { gql } from '@apollo/client'

export const GET_COUPON_BY_CODE = gql`
  query getCouponsByCode($code: String!) {
    coupons(filters: { code: {eq: $code }}){
      data {
      attributes {
        code
        description
        discountType
        discount
        discountCurrency
        indicators {
          data {
            attributes {
              slug
            }
          }
        }
        memberships {
          data {
            attributes {
              slug
            }
          }
        }
        classes {
          data {
            attributes {
              slug
            }
          }
        }
        bundles {
          data {
            attributes {
              slug
            }
          }
        }
      }
    }
  }
}
`
