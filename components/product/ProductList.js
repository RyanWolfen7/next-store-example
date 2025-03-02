import { Grid } from '@mui/material'
import ProductCard from '../../components/product/card/ProductCard'
import StorePagination from '../../components/navigation/StorePagination'
import { useSelector } from 'react-redux'
import { sortProducts, filterProducts } from '../../utils/functions/filters'
import { calculateDisplayedResults } from '../../utils/functions/calculateStoreResults'
import { useEffect } from 'react'

const ProductList = ({ products, view, search, sortBy, filterStatus, displayResults }) => {
  const { cart } = useSelector(state => state.cart)
  const { filters } = useSelector(state => state.filters)

  // search handler
  let filteredProducts = products.filter((el) => {
    // if no input the return the original
    if (search === '') {
      return el
    }

    const nameSearch = el.attributes.name.toLowerCase().includes(search)
    const traderSearch = el.attributes.product_details?.traders?.data.some((trader) => {
      const { name } = trader.attributes
      return name.toLowerCase().includes(search)
    })

    // prioritize name search over trader search
    if (nameSearch) {
      return nameSearch
    } else {
      return traderSearch
    }
  })

  // sort handler
  filteredProducts = sortProducts(filteredProducts, sortBy)

  // Apply Filters
  if (filterStatus) {
    filteredProducts = filterProducts(filteredProducts, filters)
  }

  const paginatedProducts = StorePagination(filteredProducts)
  const totalFilteredProducts = filteredProducts.length

  filteredProducts = filteredProducts.filter(prod => {
    return paginatedProducts.visibleProducts().some((pgepr) => {
      return pgepr.attributes.slug === prod.attributes.slug
    })
  })

  useEffect(() => {
    const { page, perpage } = paginatedProducts.paginationElement.props
    displayResults(calculateDisplayedResults(totalFilteredProducts, perpage, page))
  }, [paginatedProducts]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid container spacing={4}>
      {filteredProducts.map((prod, ind) => {
        const { description, thumbnail } = prod.attributes.product_details
        const product = {
          id: prod.id,
          ...prod.attributes,
          img: thumbnail.data.attributes.url,
          description: description
        }

        const inCart = cart.find(productInCart => product.slug === productInCart.slug)

        return (
          <Grid
            item
            key={ind}
            xs={12}
            sm={view === 'vertical' ? 6 : 12}
            md={view === 'vertical' ? 4 : 12}
            sx={{ display: 'flex' }}
          >
            <ProductCard
              inCart={inCart}
              product={product}
              variant={`${view}`}
            />
          </Grid>
        )
      })}
      <Grid item xs={12} sx={{ pt: 5, pb: 2, display: 'flex', justifyContent: 'center' }}>
        {paginatedProducts.paginationElement}
      </Grid>
    </Grid>
  )
}

export default ProductList
