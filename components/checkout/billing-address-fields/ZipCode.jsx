import { TextField } from '@mui/material'
import { useState } from 'react'

const ZipCodeField = ({validate, onZipCode}) => {
  const [zipCode, setZipCode] = useState({
    isValid: false,
    zipCode: ''
  })

  const onChange = (e) => {
    const {value} = e.target
    const validation = value.length > 2
    setZipCode({isValid: validation, value: value})
    if (validation) {
      onZipCode(value)
    } else {
      onZipCode('')
    }
  }

  return (
    <TextField
      error={ !zipCode.isValid && validate ? true : false }
      label="Zip Code"
      InputProps={{ name: 'zipCode', maxLength: 10 }}
      InputLabelProps={{ shrink: true }}
      value={zipCode.zipCode}
      variant="outlined"
      helperText={ !zipCode.isValid && validate ? 'Invalid Zip Code' : ''}
      onChange={onChange} />
  )
}

export default ZipCodeField
