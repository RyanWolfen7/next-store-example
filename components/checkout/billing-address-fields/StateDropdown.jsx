import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { State }  from 'country-state-city'

 
const StateDropdown = ({validate, onState, country}) => {
  const options =  State.getStatesOfCountry(country)
  const [state, setState] = useState({
    code: '',
    isValid: false
  })

  const handleChange = (e) => {
    const {value} = e.target
    const validation = value.length > 0
    setState({isValid: validation, code: e.target.value})
    if (validation) {
      onState(value)
    } else {
      onState('')
    }
    
  }

  return (
    <Grid item>
      <FormControl fullWidth>
        <InputLabel id="state-field-label">State</InputLabel>
        <Select
          labelId="state-field-label"
          value={state.code}
          label="State"
          error={ !state.isValid && validate ? true : false }
          // helperText={ !state.isValid && validate ? 'Invalid State' : ''}
          onChange={handleChange}>
          {options.map((option, index) => {
            return (
              <MenuItem 
                key={index} 
                value={option.isoCode} >
                {option.name}
              </MenuItem>
            ) 
          })}
        </Select>
      </FormControl>
    </Grid>
  )
}

export default StateDropdown
