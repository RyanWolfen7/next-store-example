import { Alert, Card, CardContent, Container, Typography } from '@mui/material'
import RegisterForm from '../../components/login/RegisterForm'
import { registerUser } from '../../store/user/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { updateUser } from '../../store/user/reducer'
import Link from 'next/link'

const LoginPage = () => {
  const [isError, setIsError] = useState('')
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const register = (credentials) => {
    const dispatchAsync = async () => {
      await dispatch(registerUser({ credentials: credentials })).unwrap()
    }
    dispatchAsync()
  }

  const removeError = () => {
    setIsError('')
  }

  useEffect(() => {
    if (user.token) {
      Router.push('/')
    }
    if (user.error) {
      setIsError(user.error)
      dispatch(updateUser({ ...user, error: '' }))
    }
  }, [user, dispatch])

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
            <strong>Create Account</strong>
          </Typography>
          <RegisterForm onRegister={register} user={user} />

          <Typography sx={{ mt: 2 }} align="center" paragraph>
            Already have an account?
            <Link href="/login"> Login Here</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}

export default LoginPage
