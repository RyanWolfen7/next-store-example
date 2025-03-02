import {
  Accordion, 
  AccordionSummary, AccordionDetails, Button, 
  FormGroup, Typography, Box
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import BillingName from './billing-address-fields/BillingName'
import AddressFieldsGroup from './billing-address-fields/AddressFieldsGroup'

const BillingAccordion = ({ setOpen, isOpen, toConfirm }) => {
  const { user } = useSelector(state => state.user)
  const [billingAddress, setBillingAddress] = useState({
    firstName: '', lastName: '',
    country: 'US', state: '',
    city: '', addressLine: '',
    addressLine2: '', zipCode: '',
    validate: false
  })

  const onName = (key, value) => {
    billingAddress[key] = value
    setBillingAddress({ ...billingAddress, validate: false })
  }

  const onCountry = (value) => {
    setBillingAddress({ ...billingAddress, country: value, state: '', validate: false })
  }

  const onAddressLine = (value) => {
    setBillingAddress({ ...billingAddress, addressLine: value, validate: false })
  }

  const onAddressLine2 = (value) => {
    setBillingAddress({ ...billingAddress, addressLine2: value, validate: false })
  }

  const onCity = (value) => {
    setBillingAddress({ ...billingAddress, city: value, validate: false })
  }

  const onState = (value) => {
    setBillingAddress({ ...billingAddress, state: value, validate: false })
  }

  const onZipCode = (value) => {
    setBillingAddress({ ...billingAddress, zipCode: value, validate: false })
  }

  const saveBillingAddress = () => {
    setBillingAddress({ ...billingAddress, validate: true })

    const validation = Object.keys(billingAddress).every(key => {
      return key != 'addressLine2' && key != 'validate' ? 
        billingAddress[key] != '' ? true : false : true
    })

    if (validation) {
      alert('Billing Address saved successflly!')
      setOpen(false)
      toConfirm(true)
    }
  }

  return (
    <Accordion disabled={!isOpen} expanded={isOpen} >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography>Billing Details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup sx={{ pt: 1 }}>
          <BillingName validate={billingAddress.validate} onName={onName} />
        </FormGroup>
        <FormGroup sx={{ pt: 1 }}>
          <AddressFieldsGroup
            validate={billingAddress.validate}
            onCountry={onCountry}
            onAddressLine={onAddressLine}
            onAddressLine2={onAddressLine2}
            onCity={onCity}
            onState={onState}
            onZipCode={onZipCode} />
        </FormGroup>
        <Box sx={{pb: 2, pt: 3, display: 'flex', justifyContent: 'center'}}>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            onClick={saveBillingAddress}>Continue</Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default BillingAccordion
