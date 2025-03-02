import { useState } from 'react'
import { Box, Container, CircularProgress, Typography } from '@mui/material'
import { useQuery } from '@apollo/client'
import { useSelector, useDispatch } from 'react-redux'
import ProductList from '../components/product/ProductList'
import QuickAccessFilter from '../components/filters/QuickAccessFilter'
import StoreFilter from '../components/filters/StoreFilter'
import StoreSearch from '../components/search/StoreSearch'
import GET_PRODUCTS from '../mocks/products'
import ViewToggle from '../components/filters/ViewToggle'
import StoreSort from '../components/filters/StoreSort'
import CategoryNav from '../components/navigation/CategoryNav'
import GET_CART_BY_EMAIL from '../graphql/queries/getCartByEmail'
import { loadCartId, restoreCart } from '../store/cart/reducer'
import StorePageSchema from '../components/schemaMarkup/StorePageSchema'

const StorePage = () => {
  const { user } = useSelector(state => state.user)
  const cartId = useSelector(state => state.cartId)
  const { loading: loadingCart, error: errorCart, data: dataCart } = useQuery(GET_CART_BY_EMAIL, { 
    skip: !user.token && !cartId,
    variables: {email: user.email}
  })
  const { loading, error, data } = useQuery(GET_PRODUCTS)
  const [gridView, setGridView] = useState('vertical')
  const [displayResult, setDisplayResult] = useState('')
  const [inputText, setInputText] = useState('')
  const [filterStatus, setFilterStatus] = useState(false)
  const [sortBy, setSortBy] = useState('')
  const definedFilters = ['Traders', 'Markets', 'Platforms']
  const dispatch = useDispatch()
  let openCart = null

  if (loading || loadingCart) {
    return <Box sx={{ textAlign: 'center', py: 16 }}> <CircularProgress /> </Box>
  }
  if (error) { return `Error! ${error.message}` }
  const { classes, indicators, memberships } = data.products.data[0].attributes
  const products = [...classes.data, ...indicators.data, ...memberships.data]

  if (dataCart && dataCart.carts.data.length > 0) {
    [ openCart ] = dataCart.carts.data
    // dispatch(loadCartId({id: openCart.id}))
    // dispatch(restoreCart(openCart))
  }
  const toggleView = (view) => {
    setGridView(view)
  }
  const filterProducts = (phrase) => {
    setInputText(phrase)
  }
  const sortProducts = (sortFilter) => {
    setSortBy(sortFilter)
  }
  const toggleFilters = (status) => {
    setFilterStatus(status)
  }
  const displayResults = (results) => {
    setDisplayResult(results)
  }

  return (
    <Container sx={{ px: 2, py: 4 }} disableGutters maxWidth="lg">
      <StorePageSchema products={products} />
      <CategoryNav />
      <Box
        sx={{ pb: 1, display: { sm: 'flex' }, justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StoreFilter products={products} toggleFilters={toggleFilters}
            definedFilters={definedFilters}/>
          <StoreSort sortProducts={sortProducts} />
        </Box>
        <Box sx={{ mt: { xs: 2, sm: 0 } }}>
          <StoreSearch filterProducts={filterProducts} />
        </Box>
      </Box>
      <Box
        sx={{ pb: 1, display: { xs: 'block', sm: 'flex' }, justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Typography sx={{ minWidth: 130, my: 2 }}>{displayResult}</Typography>
        <Box sx={{width: '100%'}}>
          <QuickAccessFilter definedFilters={definedFilters} />
        </Box>
        <ViewToggle toggleView={toggleView} />
      </Box>
      <ProductList
        products={products}
        view={gridView}
        search={inputText}
        sortBy={sortBy}
        filterStatus={filterStatus}
        displayResults={displayResults}
      />
    </Container>
  )
}
export default StorePage
