import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'

const PasswordField = ({loginState, handleChange, isSubmit}) => {
  const [ passState, setPassState ] = useState(false)
  const handleClickShowPassword = () => {
    setPassState(!passState)
  }

  return (
    <FormControl sx={{ mb: 2, width: '40ch' }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        autoComplete="current-password"
        type={passState ? 'text' : 'password'}
        value={loginState.password}
        onChange={handleChange('password')}
        error={loginState.password === '' && isSubmit}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword} edge="end">
              {passState ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  )
}

export default PasswordField
