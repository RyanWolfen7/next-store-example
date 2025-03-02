import { Button, Grid, Typography, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import ProductCard from '../product/card/ProductCard'
import CouponForm from '../../components/coupons/CouponForm'
import { useState, useEffect } from 'react'
import { Box } from '@mui/system'

const MyCart = ({ nextStep }) => {
  const { cart, coupons } = useSelector(state => state.cart)
  const [subtotal, setSubtotal] = useState(0.0)

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
    <Grid container>
      <Grid item xs={12}>
        <Typography 
          sx={{py: 5, fontWeight: 'bold', color: '#4A4A4A'}}
          variant="h3" align="center">In My Cart</Typography>
      </Grid>
      <>
        <Box sx={{
          boxShadow: '12px 12px 36px 6px rgba(13,61,110,.1)', 
          width: '100%', 
          p: 3, 
          borderRadius: 4, 
          backgroundColor: 'white'
        }}>
          {cart.map((product, index) => {
            return (
              <Grid item xs={12} sx={{mb: 3}} key={`product-grid-${index}`}>
                <ProductCard
                  key={`product-${index}`}
                  inCart={true}
                  product={product}
                  variant={`horizontal`}
                  isCartPage={true}
                />
              </Grid>
            )
          })}
          <Grid container direction="column" alignItems="flex-end">
            <Stack>
              <Typography sx={{ mb: 1, mt: 3 }}>
                Have a promo code?
              </Typography>
              {coupons?.map((coupon, index) => {
                return <CouponForm key={`COUPON-${index}`} index={index} />
              })}
            </Stack>
          </Grid>
          <Grid container sx={{mt: 6, mb: 1}}>
            <Grid item xs={10}>
              <Typography sx={{textAlign: {xs: 'center', sm: 'right'}}} >
                Subtotal</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography 
                sx={{textAlign: {xs: 'center', sm: 'right'}}} 
              >${subtotal}</Typography>
            </Grid>
          </Grid>
          <Grid container sx={{mb: 5}}>
            <Grid item xs={10}>
              <Typography sx={{textAlign: {xs: 'center', sm: 'right'}}}>
                Est. Tax Calculated at Checkout
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{textAlign: {xs: 'center', sm: 'right'}}}>
                TODO
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </>
      <Grid item xs={12} container sx={{mx: 'auto', maxWidth: '450px!important', my: 5}}
        direction={{xs: 'column', sm: 'row'}} 
        alignItems="center" 
        justifyContent="space-between">
        <Grid item sx={{ pb: {xs: 4, sm: 0}}}>
          <Button variant="outlined" size="large" href="/"> Continue Shopping </Button>
        </Grid>
        <Grid item>
          <Button onClick={() => nextStep(1)} variant="contained" size="large"> 
          Checkout </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MyCart
