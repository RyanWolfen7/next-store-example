/**
 * Get MIN and MAX prices from a products array
 * @param {Products array} products
 * @returns {obj with min and max prices}
 */
export const getPriceRange = (products) => {
  let max = 0
  let min = 0
  products.forEach((product, index) => {
    if (product.attributes.pricing) {

      const min_price = product.attributes.pricing.reduce((prev_mem, curr_mem) => {
        return prev_mem.price < curr_mem.price ? prev_mem : curr_mem
      })
      const max_price = product.attributes.pricing.reduce((prev_mem, curr_mem) => {
        return prev_mem.price > curr_mem.price ? prev_mem : curr_mem
      })

      min = min_price.price < min || index == 0 ? min_price.price : min
      max = max_price.price > max ? max_price.price : max

    } else {
      min = product.attributes.price < min || index == 0 ? product.attributes.price : min
      max = product.attributes.price > max ? product.attributes.price : max
    }
  })

  return { min: min, max: max }
}

/**
 * Sort Products
 * @param {Products array} products 
 * @param {Sort by selection} sortBy 
 * @returns 
 */
export const sortProducts = (products, sortBy) => {
  return products.sort((a, b) => {
    const prodA = a.attributes
    const prodB = b.attributes
    const sortA_Z = prodA.name.localeCompare(prodB.name)
    // push memberships first when sorting by price
    const memFirst = prodA.__typename == 'Membership' ? -1 : prodB.__typename == 'Membership' ? 1 : 0
    switch (sortBy) {
      case 'price_low_high':
        return memFirst || parseFloat(prodA.price) - parseFloat(prodB.price)
        break
      case 'price_high_low':
        return memFirst || parseFloat(prodB.price) - parseFloat(prodA.price)
        break
      case 'a_z':
        return sortA_Z
        break
      default:
        return sortA_Z
    }
  })
}

/**
 * Filter products array according with the received filters
 * @param {Products array} products 
 * @param {Active filters array} filters 
 * @returns 
 */
export const filterProducts = (products, filters) => {
  const marketsFilter = filters.markets
  const tradersFilter = filters.traders
  const platformsFilter = filters.platforms
  const priceFilter = filters.price

  return products.filter((product) => {
    let pass = true
    const { product_details } = product.attributes

    // Filter by Price
    if (priceFilter.currentPrice) {
      if (product.attributes.pricing) {
        pass = priceFilter.currentPrice >= Math.min(
          ...product.attributes.pricing.map(
            pricing => pricing.price
          )
        )
      } else {
        pass = priceFilter.currentPrice >= product.attributes.price
      }
    }

    // Filter by Markets
    if (pass && marketsFilter.length > 0) {
      pass = product_details.markets.data?.filter(marketField => {
        return marketsFilter.some(filter => {
          return marketField.attributes.slug === filter.slug
        })
      }).length > 0
    }

    // Filter by Traders
    if (pass && tradersFilter.length > 0) {
      pass = product_details.traders.data?.filter(traderField => {
        return tradersFilter.some(filter => {
          return traderField.attributes.slug === filter.slug
        })
      })?.length > 0
    }

    // Filter by Platforms
    if (pass && platformsFilter.length > 0) {
      if (product.attributes.__typename == 'Indicator') {
        pass = product.attributes.Details?.indicator_platforms?.filter(platformField => {
          return platformsFilter.some(filter => {
            return platformField.platform?.data?.attributes?.slug === filter.slug
          })
        })?.length > 0
      } else {
        pass = false
      }
    }
    return pass
  })
} 