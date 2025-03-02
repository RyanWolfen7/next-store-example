import {
  Accordion, AccordionSummary, AccordionDetails, Radio, Typography, RadioGroup, FormControlLabel,
  FormControl, FormLabel
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

const PaymentMethodAccordion = ({ onSelectedPayment, defaultPayment, toBilling, toConfirm }) => {
  const [ selectedMethod, setSelectedMethod ] = useState('')
  const { user } = useSelector(state => state.user)

  const selectMethod = (event) => {
    setSelectedMethod(event.target.value)
  }

  useEffect(() => {
    onSelectedPayment(selectedMethod)
  }, [selectedMethod, onSelectedPayment])

  return (
    <Accordion 
      disabled={user.token && !toBilling && !toConfirm ? false : true} 
      expanded={user.token && !toBilling && !toConfirm ? true : false} >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Payment Method</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Select Payment Method</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={selectedMethod}
            onChange={selectMethod}
          >
            <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
            { 
              user.token && defaultPayment && 
              <FormControlLabel 
                value="mycard" 
                control={<Radio />} 
                label={`Visa ending ${defaultPayment.number.slice(-4)}`} /> 
            }
            <FormControlLabel value="card" control={<Radio />} label="Credit Card" />
          </RadioGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  )
}

export default PaymentMethodAccordion
