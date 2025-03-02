import { TextField } from '@mui/material'
import { useState, useEffect } from 'react'
const valid = require('card-validator')

const CardExpiryDate = ({validate, onDate, defaultDate}) => {
  const [cardDate, setCardDate] = useState({
    isValid: false,
    date: ''
  })

  const onChange = (e) => {
    let date = e.target.value
    if (date.length < 5) {
      date = date.replace(/[^\dA-Z]/g, '').replace(/(.{2})/g, '$1/').trim()
    }
    validateDate(date)
  }

  const validateDate = (date) => {
    const dateValidation = valid.expirationDate(date)
    console.log(dateValidation)
    setCardDate({isValid: dateValidation.isValid, date: date})
    if (dateValidation.isValid) {
      onDate(date)
    } else {
      onDate('')
    }
  }

  useEffect(() => {
    if (defaultDate) {
      validateDate(defaultDate)
    } else {
      validateDate('')
    }
  }, [defaultDate]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TextField
      error={ !cardDate.isValid && validate ? true : false }
      label="Expiration Date"
      variant="outlined"
      helperText={ !cardDate.isValid && validate ? 'Invalid date' : ''}
      placeholder="MM/YY"
      onChange={onChange}
      inputProps={{ maxLength: 5 }}
      value={cardDate.date} />
  )
}

export default CardExpiryDate
