import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetFilters } from '../../store/filters/reducer'
import { useQuery } from '@apollo/client'
import {
  Box, Button, Container, CircularProgress, Divider, SwipeableDrawer, Typography, IconButton
} from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'
import GET_FILTERS from '../../mocks/filters'
import PriceFilter from './PriceFilter'
import CheckboxGroupFilter from './CheckboxGroupFilter'
import { getPriceRange } from '../../utils/functions/filters'
import CloseIcon from '@mui/icons-material/Close'

const StoreFilter = (props) => {
  const { loading, error, data: filters } = useQuery(GET_FILTERS)
  const [state, setState] = useState(false)
  const { products } = props
  const dispatch = useDispatch()

  if (loading) {
    return <Box sx={{ textAlign: 'center', py: 16 }}> <CircularProgress /> </Box>
  }
  if (error) { return `Error! ${error.message}` }

  const toggleDrawer = event =>  setState(!state)

  const resetFiltersHandler = () => {
    toggleDrawer(false)
    dispatch(resetFilters())
    props.toggleFilters(false)
  }

  const showResults = () => {
    toggleDrawer(false)
    props.toggleFilters(true)
  }

  return (
    <Box>
      <Button
        onClick={() => toggleDrawer(true)}
        sx={{ mr: 2 }}
        variant="outlined"
        color="main"
        startIcon={<TuneIcon />}
      >
        <strong>Filter by</strong>
      </Button>
      <SwipeableDrawer
        anchor={`left`}
        open={state}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <Box sx={{px: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography sx={{ py: 2 }} color="main" variant="h5">
            <strong>All Filters</strong>
          </Typography>
          <div><IconButton onClick={() => toggleDrawer(false) } aria-label="delete">
            <CloseIcon />
          </IconButton></div>
        </Box>
        
        {props.definedFilters.map((filter, ind) => {
          return (
            <Box key={ind}>
              <CheckboxGroupFilter
                filterTitle={filter}
                filterType={filter.toLowerCase()}
                filterOptions={filters[filter.toLowerCase()]}
              />
            </Box>
          )
        })}

        <Container sx={{ pt: 2, borderTop: '1px solid #ddd' }}>
          <label>Price</label>
          <PriceFilter
            priceRange={getPriceRange(products)}
          />
          <Box sx={{ display: { sm: 'flex', justifyContent: 'space-between' } }}>
            <Button
              variant="outlined"
              sx={{ mr: 2, mb: 2 }}
              onClick={resetFiltersHandler}
            >Reset</Button>
            <Button
              variant="contained"
              sx={{ mb: 2 }}
              onClick={showResults}
            >Update</Button>
          </Box>
        </Container>
      </SwipeableDrawer>
    </Box>
  )
}

export default StoreFilter
