import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import CheckoutStepper from '../../components/checkout/stepper'
import { Container } from '@mui/system'
import MyCart from '../../components/checkout/MyCart'
import MyCheckout from '../../components/checkout/MyCheckout'

const CheckoutPage = ({ }) => {
  const [activeStep, setActiveStep] = useState(0)

  const goToStep = (step) => {
    setActiveStep(step)
  }

  const handleScroll = () => {
    window['scrollTo']({ top: 0})
  }

  useEffect(() => {
    handleScroll()
  }, [activeStep])

  return (
    <Container maxWidth="lg" sx={{ marginTop: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Container maxWidth="md" sx={{ mb: 5 }}>
            <CheckoutStepper {...{ activeStep, setActiveStep }} />
            {activeStep === 0 && <MyCart nextStep={goToStep} />}
          </Container>
          {activeStep === 1 && <MyCheckout nextStep={goToStep} />}
          {activeStep === 2 && <div>Thank you.</div>}
        </Grid>
      </Grid>
    </Container>
  )
}

export default CheckoutPage
