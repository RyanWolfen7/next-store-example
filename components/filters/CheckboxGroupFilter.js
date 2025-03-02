import React, {useState} from 'react'
import { addFilter, removeFilter } from '../../store/filters/reducer'
import { useDispatch, useSelector } from 'react-redux'

import { 
  Box, 
  FormControl, 
  FormControlLabel, 
  FormGroup, 
  Checkbox, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography 
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const CheckboxGroupFilter = ({ filterTitle, filterType, filterOptions })  => {
  const { filters } = useSelector(state => state.filters)
  const filter = filters[filterType]
 
  const dispatch = useDispatch()

  const filterHandler = (event) => {
    const type = event.target.dataset.filter
    const slug = event.target.name
    const {title} = event.target.dataset
    if (event.target.checked) {
      dispatch(addFilter({ 
        type: type, 
        title: title,
        slug: slug 
      }))
    } else {
      dispatch(removeFilter({ 
        type: type, 
        title: title,
        slug: slug  
      }))
    }
  }

  return (
    <Box>
      <Accordion square disableGutters sx={{py: 1, boxShadow: 'none', borderTop: '1px solid #ddd'}}>
        <AccordionSummary expandIcon={<AddIcon/>}>
          <Typography>{filterTitle}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset" variant="standard">
            {filterOptions.data.map((option, index) => {
              return (
                <FormGroup key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        name={option.attributes.slug} 
                        inputProps={{
                          'data-filter': filterType, 
                          'data-title': option.attributes.name
                        }}
                        checked={
                          filter.length > 0 && filter.some((
                            filter => filter.slug == option.attributes.slug
                          ))
                        }
                        onChange={filterHandler}
                      />
                    }
                    label= {option.attributes.name}
                  />
                </FormGroup>  
              )
            })}
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default CheckboxGroupFilter


