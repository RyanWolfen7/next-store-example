/* eslint-disable */
import { gql } from '@apollo/client'

const GET_CART_BY_EMAIL = gql`
query GetCartByEmail($email: String) {
  carts(filters: {and: [
    {userEmail:{eq:$email}},
    {or:[
      {status:{eq: "open"}}, 
      {status: {eq: "abandoned"}} 
    ]}
  ]}) {
    data {
      id
      attributes {
        userEmail
        status
        cartItems {
          classes {
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
          indicators {
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
          memberships {
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
}
`
export default GET_CART_BY_EMAIL