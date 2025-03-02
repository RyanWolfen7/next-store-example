import { TextField } from '@mui/material'
import { useState } from 'react'

const CityField = ({validate, onCity}) => {
  const [city, setCity] = useState({
    isValid: false,
    value: ''
  })

  const onChange = (e) => {
    const {value} = e.target
    const validation = value.length > 0
    setCity({isValid: validation, value: value})
    if (validation) {
      onCity(value)
    } else {
      onCity('')
    }
  }

  return (
    <TextField
      error={ !city.isValid && validate ? true : false }
      label="City"
      InputProps={{ name: 'city', maxLength: 20 }}
      InputLabelProps={{ shrink: true }}
      value={city.value}
      variant="outlined"
      helperText={ !city.isValid && validate? 'Invalid City' : ''}
      onChange={onChange}/>
  )
}

export default CityField
