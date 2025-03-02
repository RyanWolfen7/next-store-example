/* eslint-disable */
import { gql } from '@apollo/client'

const GET_PRODUCTS = gql`
  query getProducts {
  products {
    data {
      attributes {
        classes(pagination: { limit: 100 }) {
          data {
            id
            attributes {
              name
              price
              slug
              product_details {
                description
                thumbnail {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                traders {
                  data {
                    attributes {
                      name
                      slug
                    }
                  }
                }
                markets {
                  data {
                    attributes {
                      name
                      slug
                    }
                  }
                }
              }
            }
          }
        }
        books(pagination: { limit: 100 }) {
          data {
            id
            attributes {
              name
              price
              slug
              product_details {
                description
                thumbnail {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                traders {
                  data {
                    attributes {
                      name
                      slug
                    }
                  }
                }
                markets {
                  data {
                    attributes {
                      name
                      slug
                    }
                  }
                }
              }
              Details {
                indicator_platforms {
                  platform {
                    data {
                      attributes {
                        name
                        slug
                      }
                    }
                  }
                }
              }
            }
          }
        }
        memberships(pagination: { limit: 100 }) {
          data {
            id
            attributes {
              name
              slug
              pricing {
                price
                price_per
              }
              product_details {
                description
                thumbnail {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                traders {
                  data {
                    attributes {
                      name
                      slug
                    }
                  }
                }
                markets {
                  data {
                    attributes {
                      name
                      slug
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export default GET_PRODUCTS

