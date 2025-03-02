import { Grid, Button} from '@mui/material'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import CountryDropdown from './CountryDropdown'
import StateDropdown from './StateDropdown'
import AddressLineField from './AddressLineField'
import CityField from './CityField'
import ZipCodeField from './ZipCode'

const AddressFieldsGroup = ({
  validate,
  onCountry,
  onAddressLine,
  onAddressLine2,
  onCity,
  onState,
  onZipCode
}) => {
  const [country, setCountry] = useState('US')
  const [line2, setLine2] = useState(false)
  
  return (
    <Grid>
      <Grid container sx={{pb: 3}}>
        <CountryDropdown 
          validate={validate}
          onCountry={onCountry} 
          country={country} 
          setCountry={setCountry}/>
      </Grid>
      <Grid container sx={{ pb: 2 }}>
        <AddressLineField 
          validate={validate}
          onAddressLine={onAddressLine}
          options={{
            label: 'Address Line 1', 
            name: 'addressLine', 
            required: true}}/>
      </Grid>
      <Grid container sx={{ mt: 1 }}>
        {!line2 && <Button 
          onClick={() => setLine2(true)}
          startIcon={<AddIcon />}>Add Apt, Suite, Unit</Button>}

        {line2 && <AddressLineField 
          validate={validate}
          onAddressLine={onAddressLine2}
          options={{
            label: 'Address Line 2', 
            name: 'addressLine2', 
            required: false}}/>}
      </Grid>
      
      <Grid container sx={{ mt: 1 }} spacing={2}>
        <Grid item xs={4}>
          <CityField validate={validate} onCity={onCity}/>
        </Grid>
        <Grid item xs={4}>
          <StateDropdown validate={validate} onState={onState} country={country}/>
        </Grid>
        <Grid item xs={4}>
          <ZipCodeField validate={validate} onZipCode={onZipCode}/>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddressFieldsGroup
