import { Card, CardContent, Typography, List, ListItem, Box, Divider } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import CouponForm from '../../components/coupons/CouponForm'
import SummaryProduct from './SummaryProduct'
import Disclaimer from './disclaimer'

const OrderSummary = () => {
  const { cart, coupons } = useSelector(state => state.cart)
  const [ subtotal, setSubtotal ] = useState(0.0)

  useEffect(() => {
    let total = 0
    cart.forEach(item => {
      if (item.__typename === 'Membership') {
        const { price } = JSON.parse(item.selPricing)
        return setSubtotal(total += (item.isDiscounted ? item.discountedPrice : price))
      }

      return setSubtotal(total += (item.isDiscounted ? item.discountedPrice : item.price))
    })
  }, [cart])

  return (
    <Fragment>
      <Card>
        <CardContent>
          <Typography variant="h5">
            Order Summary
          </Typography>
          <Typography sx={{ my: 1, display: 'flex', alignItems: 'center' }} variant="h6">
            <ShoppingCartOutlinedIcon sx={{mr: 1}} />
            In My Cart
          </Typography>

          <List sx={{ width: '100%',mt: 2, borderTop: '1px solid #ddd' }}>
            {cart.map((product, index) => {
              return (
                <SummaryProduct key={index} product={product} />
              )
            })}
            <ListItem sx={{ mt: 2, px: 0 }}>
              <Box sx={{ width: '100%' }}>
                <Box>
                  <Typography sx={{ width: 300, ml: 'auto', mr: 0, mb: 1 }}>
                    Have a promo code?
                  </Typography>
                  {coupons?.map((coupon, index) => {
                    return <CouponForm key={`COUPON-${index}`} index={index} />
                  })}
                </Box>
                <Typography
                  align="left"
                  variant="h6"
                  sx={{ pt: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Subtotal</strong>
                  <span>${subtotal}</span>
                </Typography>
                <Typography
                  align="left"
                  variant="h6"
                  sx={{ pt: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Tax</strong>
                  <span>---</span>
                </Typography>
                <Divider sx={{my: 3}} />
                <Typography
                  align="left"
                  variant="h6"
                  sx={{ pt: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Total</strong>
                  <strong>${subtotal}</strong>
                </Typography>
              </Box>
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Disclaimer />
    </Fragment>
  )
}

export default OrderSummary
