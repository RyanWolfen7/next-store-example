import { Box, FormControl, Button, CircularProgress, Switch, FormControlLabel, FormGroup 
} from '@mui/material'
import { useState, useEffect } from 'react'
import Script from 'next/script'
import PasswordField from './PasswordField'
import UsernameField from './UsernameField'

const LoginForm = ({ onLogin, user }) => {
  const [isSubmit, setIsSubmit] = useState(false)
  const recaptchaEl = document.querySelector('.grecaptcha-badge')
  const [loginState, setLoginState] = useState({
    username: '',
    password: '',
    rememberme: false,
    recaptcha_token: ''
  })

  const recaptcha = () => {
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_KEY,
        { action: 'login' }
      )
      token && setLoginState({ ...loginState, recaptcha_token: token })
    })
  }
  const handleChange = (prop) => (event) => {
    setLoginState({ ...loginState, [prop]: event.target.value })
  }
  const keepLogged = (e) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.checked
    })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    setIsSubmit(true)
    // turn off validation after 5s
    setTimeout(() => { setIsSubmit(false) }, 5000)
    if (Object.values(loginState).every(x => x !== '')) {
      onLogin(loginState)
    }
  }
  const toggleRecaptchaEl = () => {
    if (!user.token) {
      if (window.grecaptcha) {
        recaptcha()
      }
      if (recaptchaEl) {
        // TODO use grecaptcha.enterprise.render() to set a 
        // custom element and display it only when user is not logged in
        recaptchaEl.style.visibility = 'visible'
      }
    } else {
      if (recaptchaEl) {
        recaptchaEl.style.visibility = 'hidden'
      }
    }
  }
  useEffect(() => {
    toggleRecaptchaEl()
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box>
      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_KEY}`}
        onLoad={() => {
          recaptcha()
        }}
      />
      <form>
        <FormGroup sx={{ display: 'flex', flexDirection: 'column' }}>
          <UsernameField loginState={loginState} handleChange={handleChange} isSubmit={isSubmit} />
          <PasswordField loginState={loginState} handleChange={handleChange} isSubmit={isSubmit} />
          <FormControl sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Switch checked={loginState.rememberme} onChange={keepLogged} name="rememberme" />
              }
              label="Keep me logged in"
            />
          </FormControl>
          {!user?.isLoading ?
            <Button
              disabled={!loginState.recaptcha_token}
              size="large"
              color="primary"
              variant="contained"
              type="submit"
              onClick={(e) => onSubmit(e)}
            >Login</Button> :
            <Box sx={{ textAlign: 'center' }}><CircularProgress /></Box>}
        </FormGroup>
      </form>
    </Box>
  )
}

export default LoginForm
