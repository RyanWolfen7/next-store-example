import {
  Card, CardContent, Grid, Typography, FormGroup, FormControlLabel, Checkbox, Button
} from '@mui/material'
import { useState, useEffect } from 'react'
import styles from '../../../styles/PaymentCard.module.scss'
import CardNumber from './card-fields/CardNumber'
import CardExpiryDate from './card-fields/CardExpiryDate'
import CardCVV from './card-fields/CardCVV'
const valid = require('card-validator')

const PaymentCard = ({defaultPayment, toBilling}) => {
  const [cardState, setCardState] = useState({
    validate: false,
    number: '',
    date: '',
    cvv: ''
  })

  const savePayMethod = () => {
    setCardState({...cardState, validate: true})
    
    // make request with validated data
    if (Object.values(cardState).every(f => f !== '')) {
      alert('Card saved successflly!')
      toBilling(true)
    }
  }

  const onNumber = (number) => {
    setCardState({
      ...cardState,
      validate: false, 
      number: number
    })
  }

  const onCVV = (cvv) => {
    setCardState({
      ...cardState, 
      validate: false, 
      cvv: cvv
    })
  }

  const onDate = (date) => {
    setCardState({
      ...cardState, 
      validate: false, 
      date: date
    })
  }

  return (
    <Card className={styles.payemnt_field}>
      <CardContent>
        <Typography variant="h6" 
          sx={{ pb: 3 }}>{defaultPayment ? 'My Card' : 'Add Card'}</Typography>
        <CardNumber 
          validate={cardState.validate} 
          onNumber={onNumber}
          defaultNumber={defaultPayment?.number}
        />
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <CardExpiryDate 
              validate={cardState.validate} 
              onDate={onDate}
              defaultDate={defaultPayment?.date} />
          </Grid>
          <Grid item xs={6}>
            <CardCVV validate={cardState.validate} onCVV={onCVV} />
          </Grid>
        </Grid>
        <FormGroup sx={{ pt: 1 }}>
          <FormControlLabel
            control={
              <Checkbox />
            } label="Save this card for future purchases" />
        </FormGroup>

        <Button 
          sx={{mt: 2}} 
          variant="contained" 
          onClick={savePayMethod}
          fullWidth>{defaultPayment ? 'Continue' : 'Save & Continue'}</Button>
      </CardContent>
    </Card>
  )
}

export default PaymentCard
