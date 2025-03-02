import { func, number } from 'prop-types'
import { Stack, Stepper, Step, StepLabel, StepButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled } from '@mui/material/styles'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'

const steps = ['Cart', 'Checkout', 'Confirmation']

const CheckoutStepper = ({
  activeStep = 0, // index number
  setActiveStep   // index handler
}) => {

  const StepperDots = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)'
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#0F6AC4'
      }
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#0F6AC4'
      }
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: 'BEBEBE',
      borderTopWidth: 3
    }
  }))

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<StepperDots />}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              <Typography variant="h6" sx={{color: index === activeStep ? '#0F6AC4' : '#BEBEBE'}}>
                {label}
              </Typography>

            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

CheckoutStepper.propTypes = {
  activeStep: number.isRequired,
  setActiveStep: func.isRequired
}

export default CheckoutStepper
