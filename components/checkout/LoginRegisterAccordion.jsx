import {
  Accordion, AccordionSummary, AccordionDetails, Alert, Typography, Grid, Box, Link
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../store/user/reducer'
import LoginForm from '../../components/login/LoginForm'
import RegisterForm from '../../components/login/RegisterForm'
import { useEffect, useState } from 'react'
import { getUserJWT, registerUser } from '../../store/user/userActions'

const LoginRegisterAccorgion = () => {
  const [isError, setIsError] = useState('')
  const { user } = useSelector(state => state.user)
  const [isRegister, setIsRegister] = useState(false)
  const dispatch = useDispatch()

  const login = (credentials) => {
    const dispatchAsync = async () => {
      await dispatch(getUserJWT({ credentials: credentials })).unwrap()
    }
    dispatchAsync()
  }

  const register = (credentials) => {
    const dispatchAsync = async () => {
      await dispatch(registerUser({ credentials: credentials })).unwrap()
    }
    dispatchAsync()
  }

  useEffect(() => {
    if (user.error) {
      setIsError(user.error)
      dispatch(updateUser({ ...user, error: '' }))
    }
    if (user.token) {
      setIsRegister(false)
    }
  }, [user, dispatch])

  return (
    <Accordion disabled={user.token ? true : false} expanded={user.token ? false : true} >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          {
            !isRegister && !user.token ?
              'Login' :
              !isRegister && user.token ?
                `Logged in as ${user.name}` :
                'Create Account'
          }
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isError ?
          <Alert
            sx={{ mb: 3, maxWidth: 452 }}
            onClose={() => setIsError('')}
            severity="error"
            variant="outlined"
          >
            <div dangerouslySetInnerHTML={{ __html: isError }}></div>
          </Alert> : ''}
        {
          !isRegister ?
            <Box>
              <LoginForm onLogin={login} user={user} />
              <Typography sx={{ pt: 2 }}>
                New?
                You will need to 
                <Link
                  sx={{ pr: 1, fontSize: '1rem' }}
                  component="button"
                  onClick={() => setIsRegister(true)}>Register an account</Link>
                to purchase our classes and other products.
              </Typography>
            </Box>
            : <Box>
              <RegisterForm onRegister={register} user={user} />
              <Typography sx={{ mt: 2 }} align="center" paragraph>
                Already have an account?
                <Link
                  sx={{ pl: 1, fontSize: '1rem' }}
                  component="button"
                  onClick={() => setIsRegister(false)}>Login here</Link>
              </Typography>
            </Box>
        }
      </AccordionDetails>
    </Accordion >
  )
}

export default LoginRegisterAccorgion
