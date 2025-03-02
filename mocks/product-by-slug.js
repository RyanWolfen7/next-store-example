/* eslint-disable */
import { gql } from '@apollo/client'

const GET_PRODUCT = gql`
 query GetProductBySlug($slug: String) {
  products {
    data {
      attributes {
        classes(filters:{slug: {eq: $slug}}) {
          data {
            attributes {
              name
            }
          }
        }
        indicators(filters:{slug: {eq: $slug}}) {
          data {
            attributes {
              name
            }
          }
        }
        memberships(filters:{slug: {eq: $slug}}) {
          data {
            attributes {
              name
            }
          }
        }
      }
    }
  }
}
`

export default GET_PRODUCT