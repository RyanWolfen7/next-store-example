import { Alert, Card, CardContent, Container, Typography } from '@mui/material'
import LoginForm from '../../components/login/LoginForm'
import { getUserJWT } from '../../store/user/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { updateUser } from '../../store/user/reducer'
import Link from 'next/link'

const LoginPage = () => {
  const [isError, setIsError] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState(false)
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  const login = (credentials) => {
    const dispatchAsync = async () => {
      await dispatch(getUserJWT({ credentials: credentials })).unwrap()
    }
    dispatchAsync()
  }

  useEffect(() => {
    if (user.error) {
      setIsError(user.error)
      dispatch(updateUser({ ...user, error: '' }))
    }
    if (user.token) {
      Router.push('/')
    }
  }, [user, dispatch])

  const removeError = () => {
    setIsError('')
  }

  return (
    <Container maxWidth="lg"
      sx={{
        py: 4,
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      {isError ?
        <Alert
          sx={{ mb: 3, maxWidth: 452 }}
          onClose={removeError}
          severity="error"
          variant="outlined"
        >
          <div dangerouslySetInnerHTML={{ __html: isError }}></div>
        </Alert> : ''}
      <Card sx={{ p: 4 }}>
        <CardContent>
          <Typography sx={{ pb: 4, textAlign: 'center' }} variant="h5" color="initial">
            <strong>Login</strong>
          </Typography>
          <LoginForm onLogin={login} user={user} />
          <Typography sx={{ mt: 2 }} align="center" paragraph>
            New?
            <Link href="/register"> Sign Up Here</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}

export default LoginPage
