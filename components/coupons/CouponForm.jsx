import {
  IconButton, Button, CircularProgress, InputBase, Paper, Grid, Typography, Box, Stack
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import { parseSingleCouponData } from '../../utils/qglParsers/coupon'
import { addCoupon, removeCoupon } from '../../store/cart/reducer'
import { GET_COUPON_BY_CODE } from './queries'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const CouponForm = ({
  index // index of coupon form array
}) => {
  const [coupon, setCoupon] = useState('')
  const [stateSwitch, setStateSwitch] = useState(false)
  const { coupons } = useSelector(state => state.cart)
  const [validateCoupon, { loading, error, data }] = useLazyQuery(GET_COUPON_BY_CODE)
  const dispatch = useDispatch()

  useEffect(() => {
    const parsedData = parseSingleCouponData(data)
    if (!parsedData) {
      alert('Sorry this coupon does not exist, please check to see if you imported correctly')
    } else if (parsedData.__typename) {
      dispatch(addCoupon(parsedData))
      setCoupon('')
    }
  }, [data, dispatch, stateSwitch])

  return (
    <Stack direction="row">
      <Paper
        component="form"
        sx={{
          my: 1,
          p: '2px 4px',
          width: { md: 300 },
          borderRadius: 2
        }}
      >
        {loading && <CircularProgress />}
        {!coupons[index].code && <>
          <InputBase
            sx={{ ml: 1, flex: 1, p: .5, width: '100%'}}
            placeholder="Coupon Code"
            inputProps={{ 'aria-label': 'search google maps' }}
            value={coupon}
            onChange={event => setCoupon(event.target.value)}
          />
        </>}
        {coupons[index].code && <>
          <Grid container spacing={2} sx={{ p: 1 }} direction="row" alignItems="center">
            <Grid item xs={9} sx={{ display: 'flex' }}>
              <CheckCircleOutlinedIcon color="success" />
              <Box sx={{ ml: 1 }}>
                <Typography
                  align="left"
                  varient="h2">
                  {coupons[index].code}
                </Typography>
                <Typography sx={{ fontSize: 12 }}>
                  Promo Code Applied
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3} sx={{ textAlign: 'right' }}>
              <IconButton
                aria-label="upload picture"
                component="label"
                onClick={() => dispatch(removeCoupon(coupons[index]))}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        </>}
      </Paper>

      {!coupons[index].code &&
        <Button
          variant="contained"
          size="small"
          sx={{px: '35px', my: 1, ml: 1, fontWeight: 'bold', borderRadius: 2}}
          onClick={() => (
            validateCoupon({ variables: { code: coupon } }),
            setStateSwitch(!stateSwitch)
          )}>
        Apply
        </Button>
      }
    </Stack>
  )
}

export default CouponForm
