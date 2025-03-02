import React, { useState } from 'react'
import { addFilter, removeFilter } from '../../store/filters/reducer'
import { useDispatch, useSelector } from 'react-redux'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'

import {
  Box,
  Button
} from '@mui/material'

const QuickAccessFilter = ({ definedFilters }) => {
  const { filters } = useSelector(state => state.filters)
  const dispatch = useDispatch()

  return (
    <Box>
      {definedFilters.map((filter, index) => {
        return (
          <div key={index}>
            {filters[filter.toLowerCase()].map((option, ind) => {
              return (
                <Button
                  variant="outlined"
                  color="main"
                  size="small"
                  key={ind}
                  sx={{ 
                    m: 0.5,
                    fontSize: 13, 
                    textTransform: 'capitalize',
                    borderRadius: 30
                  }}
                  startIcon={<ClearOutlinedIcon />}
                  onClick={() => dispatch(removeFilter({
                    type: filter.toLowerCase(),
                    slug: option.slug
                  }))}
                >{option.title}</Button>
              )
            })}
          </div>
        )  
      })}

      {filters.price.currentPrice < filters.price.maxPrice &&
        <Button
          variant="outlined"
          color="main"
          size="small"
          sx={{ 
            m: 0.5,
            fontSize: 13, 
            textTransform: 'capitalize',
            borderRadius: 30
          }}
          startIcon={<ClearOutlinedIcon />}
          onClick={() => dispatch(removeFilter({
            type: 'price'
          }))}
        >Price &#60;= ${filters.price.currentPrice}</Button>
      }
    

    </Box>
  )
}

export default QuickAccessFilter


