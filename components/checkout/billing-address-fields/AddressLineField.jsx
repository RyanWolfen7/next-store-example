import { TextField } from '@mui/material'
import { useState } from 'react'

const AddressLineField = ({validate, onAddressLine, options}) => {
  const [addressLine, setAddressLine] = useState({
    isValid: false,
    value: ''
  })

  const onChange = (e) => {
    const {value} = e.target
    const validation = value.length > 0
    setAddressLine({isValid: validation, value: value})
    if (validation) {
      onAddressLine(value)
    } else {
      onAddressLine('')
    }
  }

  return (
    <TextField
      error={ !addressLine.isValid && validate && options.required? true : false }
      label={options.label}
      InputProps={{ name: options.name, maxLength: 50 }}
      value={addressLine.value}
      variant="outlined"
      helperText={
        !addressLine.isValid && validate && options.required ? 
          `Invalid ${  options.label}` : ''
      }
      onChange={onChange}
      fullWidth/>
  )
}

export default AddressLineField
