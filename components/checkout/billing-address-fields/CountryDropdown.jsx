import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useMemo } from 'react'
import { Country }  from 'country-state-city'

 
const CountryDropdown = ({validate, onCountry, country, setCountry}) => {
  const options = useMemo(() => Country.getAllCountries(), [])

  const handleChange = (e) => {
    onCountry(e.target.value)
    setCountry(e.target.value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="country-field-label">Country</InputLabel>
      <Select
        labelId="country-field-label"
        value={country}
        label="Country"
        onChange={handleChange}
        autoWidth
      >
        {options.map((option, index) => {
          return (
            <MenuItem 
              key={index} 
              value={option.isoCode} 
              selected={option.isoCode == 'US' ? true : false }
            >
              {option.name}
            </MenuItem>
          ) 
        })}
      </Select>
    </FormControl>
  )
}

export default CountryDropdown
