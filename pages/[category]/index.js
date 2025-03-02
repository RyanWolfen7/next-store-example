import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../store/system/systemActions'
import { gql, useQuery } from '@apollo/client'
import { CircularProgress, Box, Container, Typography } from '@mui/material'
import ProductList from '../../components/product/ProductList'
import QuickAccessFilter from '../../components/filters/QuickAccessFilter'
import StoreFilter from '../../components/filters/StoreFilter'
import StoreSearch from '../../components/search/StoreSearch'
import ViewToggle from '../../components/filters/ViewToggle'
import StoreSort from '../../components/filters/StoreSort'
import GET_PRODUCTS from '../../mocks/products'
import CategoryNav from '../../components/navigation/CategoryNav'

const CategoryPage = (params) => {
  const { categories, subtotal } = useSelector(state => state.system)
  const { loading, error, data } = useQuery(GET_PRODUCTS)
  const [displayResult, setDisplayResult] = useState('')
  const [gridView, setGridView] = useState('vertical')
  const [inputText, setInputText] = useState('')
  const [filterStatus, setFilterStatus] = useState(false)
  const [sortBy, setSortBy] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()
  const { category } = router.query
  const definedFilters = ['Traders', 'Markets', 'Platforms']

  useEffect(() => {
    const dispatchAsync = async () => { await dispatch(getCategories()).unwrap() }
    dispatchAsync()
  }, [dispatch])

  if (loading || categories.isLoading) {
    return <Box sx={{ textAlign: 'center', py: 16 }}> <CircularProgress /> </Box>
  }
  if (error) { return `Error! ${error.message}` }
  if (!categories.list.includes(category)) { return <div> 404 Not found </div> }
  const { classes, indicators, memberships } = data.products.data[0].attributes
  const products = {
    courses: [...classes.data],
    indicators: [...indicators.data],
    memberships: [...memberships.data]
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
      <CategoryNav />
      <Box
        sx={{
          pb: 1, display: { sm: 'flex' }, justifyContent: 'space-between', alignItems: 'center'
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StoreFilter
            products={products[category]}
            toggleFilters={toggleFilters}
            definedFilters={definedFilters}
          />
          <StoreSort sortProducts={sortProducts} />
        </Box>
        <Box sx={{ mt: { xs: 2, sm: 0 } }}>
          <StoreSearch filterProducts={filterProducts} />
        </Box>
      </Box>
      <Box
        sx={{
          pb: 1, display: { xs: 'block', sm: 'flex' }, justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Typography sx={{ minWidth: 130, my: 2 }}>{displayResult}</Typography>
        <Box sx={{ width: '100%' }}><QuickAccessFilter definedFilters={definedFilters} /></Box>
        <ViewToggle toggleView={toggleView} />
      </Box>
      <ProductList
        products={products[category]}
        view={gridView}
        search={inputText}
        sortBy={sortBy}
        filterStatus={filterStatus}
        displayResults={displayResults}
      />
    </Container >
  )
}

export default CategoryPage
