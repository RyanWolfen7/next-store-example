import {
  TextField, FormControl, FormGroup, Button, Box,
  CircularProgress
} from '@mui/material'
import { useState } from 'react'

const RegisterForm = ({ onRegister, user }) => {
  const [isSubmit, setIsSubmit] = useState(false)
  const recaptchaEl = document.getElementsByClassName('grecaptcha-badge')
  const [registerState, setRegisterState] = useState({
    first_name: '',
    last_name: '',
    email: ''
  })

  const handleChange = (prop) => (event) => {
    setRegisterState({ ...registerState, [prop]: event.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setIsSubmit(true)
    setTimeout(() => {
      setIsSubmit(false)
    }, 5000)
    if (Object.values(registerState).every(x => x !== '')) {
      if (recaptchaEl.length > 0 && user.token) {
        recaptchaEl[0].style.visibility = 'hidden'
      }
      onRegister(registerState)
    }
  }

  return (
    <form>
      <FormGroup sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormControl sx={{ mb: 3, width: '40ch' }} variant="outlined">
          <TextField
            onChange={handleChange('first_name')}
            label="First name"
            variant="outlined"
            error={registerState.first_name === '' && isSubmit}
            helperText={registerState.first_name === '' && isSubmit ? 'This field is required' : ''}
          />
        </FormControl>
        <FormControl sx={{ mb: 3, width: '40ch' }} variant="outlined">
          <TextField
            onChange={handleChange('last_name')}
            label="Last name"
            variant="outlined"
            error={registerState.last_name === '' && isSubmit}
            helperText={registerState.last_name === '' && isSubmit ? 'This field is required' : ''}
          />
        </FormControl>
        <FormControl sx={{ mb: 3, width: '40ch' }} variant="outlined">
          <TextField
            onChange={handleChange('email')}
            label="Email"
            variant="outlined"
            error={registerState.email === '' && isSubmit}
            helperText={registerState.email === '' && isSubmit ? 'This field is required' : ''}
          />
        </FormControl>
        {!user?.isLoading ?
          <Button
            size="large"
            color="primary"
            variant="contained"
            type="submit"
            onClick={(e) => onSubmit(e)}
          >Create account</Button>
          :
          <Box sx={{ textAlign: 'center' }}><CircularProgress /></Box>
        }
      </FormGroup>
    </form>
  )
}

export default RegisterForm
