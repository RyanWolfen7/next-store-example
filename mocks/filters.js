import { gql } from '@apollo/client'

const GET_FILTERS = gql`
query getFilters {
    traders(pagination: { limit: 100 }) {
      data {
        attributes {
          slug
          name
        }
      }
    }
    markets(pagination: { limit: 100 }) {
      data {
        attributes {
          name
          slug
        }
      }
    }
    platforms(pagination: { limit: 100 }) {
      data {
        attributes {
          name
          slug
        }
      }
    }
}  
`

export default GET_FILTERS
