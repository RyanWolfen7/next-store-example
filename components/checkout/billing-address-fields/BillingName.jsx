import { Grid, TextField } from '@mui/material'
import { useState } from 'react'
import { validateText } from '../../../utils/functions/validations'

const BillingName = ({validate, onName}) => {
  const [billingName, setBillingName] = useState({
    isValid: false,
    firstName: '',
    lastName: ''
  })

  const onChange = (e) => {
    const {value} = e.target
    const field = e.target.name 
    const validation = validateText(value)
    const newState = billingName
    newState[field] = value
    setBillingName({...newState,isValid: validation})
    if (validation) {
      onName(field, value)
    } else {
      onName(field, '')
    }
  }

  return (
    <Grid container sx={{ mb: 2 }} spacing={2}>
      <Grid item xs={6}>
        <TextField
          sx={{width: '100%'}}
          error={ !billingName.isValid && validate ? true : false }
          label="First Name"
          InputProps={{ name: 'firstName',  maxLength: 20}}
          value={billingName.firstName}
          variant="outlined"
          helperText={ !billingName.isValid && validate ? 'Invalid First Name' : ''}
          onChange={onChange}/>
      </Grid>
      <Grid item xs={6}>
        <TextField
          sx={{width: '100%'}}
          error={ !billingName.isValid && validate ? true : false }
          label="Last Name"
          InputProps={{ name: 'lastName', maxLength: 20 }}
          value={billingName.lastName}
          variant="outlined"
          helperText={ !billingName.isValid && validate ? 'Invalid Last Name' : ''}
          onChange={onChange} />
      </Grid>
    </Grid>
  )
}

export default BillingName
