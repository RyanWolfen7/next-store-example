import {
  FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText
} from '@mui/material'
import { useState, useEffect } from 'react'
import AddCardIcon from '@mui/icons-material/AddCard'
import Image from 'next/image'
const valid = require('card-validator')

const CardNumber = ({ validate, onNumber, defaultNumber }) => {
  const [cardType, setCardType] = useState('')
  const [cardNumber, setCardNumber] = useState({
    isValid: false,
    number: ''
  })

  const onCardNumber = (e) => {
    const number = formatNumber(e.target.value)
    validateNumber(number)
  }

  const validateNumber = (number) => {
    const numberValidation = valid.number(number)
    setCardNumber({ isValid: numberValidation.isValid, number: number })
    if (numberValidation.isValid) {
      onNumber(number)
    } else {
      onNumber('')
    }
    if (numberValidation.card) {
      setCardType(numberValidation.card.type)
    } else {
      setCardType('')
    }
  }

  const formatNumber = (number) => {
    return number.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()
  }

  useEffect(() => {
    if (defaultNumber) {
      const number = formatNumber(defaultNumber)
      validateNumber(number)
    } else {
      validateNumber('')
    }
  }, [defaultNumber]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FormControl sx={{ width: '100%' }} variant="outlined">
      <InputLabel htmlFor="card-number">Card Number</InputLabel>
      <OutlinedInput
        error={!cardNumber.isValid && validate ? true : false}
        id="card-number"
        type="text"
        inputProps={{ maxLength: 19 }}
        value={cardNumber.number}
        onChange={onCardNumber}
        endAdornment={
          <InputAdornment position="end">
            {
              cardType ?
                <Image
                  src={`/payment_cards_icons/${cardType}.png`}
                  width="50"
                  height="50"
                  alt={`${cardType}`} />
                : <AddCardIcon />
            }
          </InputAdornment>
        }
        label="Card Number"
      />
      {!cardNumber.isValid && validate ?
        <FormHelperText error id="accountId-error">
          Invalid card number
        </FormHelperText>
        : ''
      }
    </FormControl>
  )
}

export default CardNumber
