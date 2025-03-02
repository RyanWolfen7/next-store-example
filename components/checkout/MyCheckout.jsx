import { Container, Grid, Box, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import LoginRegisterAccorgion from './LoginRegisterAccordion'
import PaymentMethodAccordion from './PaymentMethodAccordion'
import Paypal from './payment-methods/PayPal'
import PaymentCard from './payment-methods/PaymentCard'
import BillingAccordion from './BillingAccordion'
import OrderSummary from './OrderSummary'

const defaultPayment = {
  number: '4111111111111111',
  date: '12/24',
  cvv: '321'
}

const MyCheckout = ({ nextStep }) => {
  const { user } = useSelector(state => state.user)
  const [selPay, setSelPay] = useState('')
  const [toBilling, setToBilling] = useState(false)
  const [toConfirm, setToConfirm] = useState(false)
  let placeOrderDisabled = true

  const selectedPayment = (selPay) => {
    setSelPay(selPay)
  }

  const goToBilling = (isBilling) => {
    setToBilling(isBilling)
  }

  const goToConfirm = (isConfirm) => {
    setToConfirm(isConfirm)
  }

  const placeOrder = () => {
    placeOrderDisabled = false
    // validate user information here
    nextStep(2)
  }

  return (
    <Container sx={{ py: 4, mb: 8 }} disableGutters maxWidth="lg">
      <Grid container spacing={{ xs: 2, md: 10 }} direction={{ xs: 'column-reverse', md: 'row' }}>
        <Grid item xs={12} md={6}>
          <Box>
            <LoginRegisterAccorgion />
          </Box>
          <Box sx={{ pt: 2 }}>
            <PaymentMethodAccordion
              onSelectedPayment={selectedPayment}
              defaultPayment={defaultPayment}
              toBilling={toBilling}
              toConfirm={toConfirm} />
          </Box>
          <Box sx={{ mt: 2 }}>
            {selPay && selPay === 'paypal' ?
              <Paypal /> :
              selPay && selPay === 'card' && !toBilling && !toConfirm ?
                <PaymentCard toBilling={goToBilling} />
                : selPay && selPay === 'mycard' && !toBilling && !toConfirm ?
                  <PaymentCard
                    defaultPayment={defaultPayment}
                    toBilling={goToBilling} />
                  : ''}
          </Box>
          {(toBilling || toConfirm) && <Button onClick={() => {
            setToBilling(false)
            setToConfirm(false)
          }}>Edit payment method</Button>}
          <Box sx={{ mt: 2 }}>
            <BillingAccordion
              setOpen={goToBilling}
              isOpen={toBilling}
              toConfirm={goToConfirm} />
          </Box>
          {toConfirm && <Button onClick={() => {
            setToConfirm(false)
            setToBilling(true)
          }}>Edit Billing Address</Button>}
          <Box sx={{ pt: 6, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined" sx={{ mr: 6 }}
              onClick={() => nextStep(0)}>Edit Cart</Button>
            <Button variant="contained"
              disabled={!toConfirm} 
              onClick={placeOrder}
            >Place Order</Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <OrderSummary />
        </Grid>
      </Grid>
    </Container>
  )
}

export default MyCheckout
