import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Slider } from '@mui/material'
import { addFilter, removeFilter } from '../../store/filters/reducer'

function valuetext(value) {
  return `$${value}`
}

const PriceFilter = (priceRange) => {
  const range = priceRange.priceRange
  const { filters } = useSelector(state => state.filters)
  const actualPrice = filters.price.currentPrice != -1 ? filters.price.currentPrice : range.max
  const [priceFilter, setPriceFilter] = useState(actualPrice)  
  const dispatch = useDispatch()

  const handleChange = (event, newValue) => {
    setPriceFilter(newValue)
    const type = 'price'
    const price = newValue
    const title = `Price <= ${  valuetext(newValue)}`
    dispatch(addFilter({ type, price, title, range}))
  }

  const marks = [
    {
      value: range.min,
      label: `$${  range.min}`
    },
    {
      value: range.max,
      label: `$${  range.max}`
    }
  ]

  return (
    <Box sx={{ pb: 4, width: 300 }}>
      <Slider 
        getAriaLabel={() => 'Price range'}
        defaultValue={range.max}
        value={priceFilter || range.max}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        valueLabelFormat={valuetext}
        step={10}
        marks={marks}
        min={range.min}
        max={range.max} 
      />
    </Box>
  )
}

export default PriceFilter
