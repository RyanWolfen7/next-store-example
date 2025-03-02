import { TextField } from '@mui/material'
import { useState, useEffect } from 'react'
const valid = require('card-validator')

const CardCVV = ({validate, onCVV}) => {
  const [cardCVV, setCardCVV] = useState({
    isValid: false,
    cvv: ''
  })

  const onChange = (e) => {
    const cvv = e.target.value
    const cvvValidation = valid.cvv(cvv)
    setCardCVV({isValid: cvvValidation.isValid, cvv: cvv})
    if (cvvValidation.isValid) {
      onCVV(cvv)
    } else {
      onCVV('')
    }
  }

  return (
    <TextField
      error={ !cardCVV.isValid && validate ? true : false }
      label="CVV"
      value={cardCVV.cvv}
      variant="outlined"
      helperText={ !cardCVV.isValid && validate ? 'Invalid CVV' : ''}
      onChange={onChange}
      inputProps={{ maxLength: 4 }} />
  )
}

export default CardCVV
