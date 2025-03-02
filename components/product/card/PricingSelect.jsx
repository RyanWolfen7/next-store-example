import {
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../../../store/cart/reducer'

const PricingSelect = ({ product, onSelect, isCartPage }) => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.cart)
  const productFromCart = cart.find(pr => pr.slug === product.slug)
  const onChange = (e) => {
    if (isCartPage) {
      dispatch(addToCart({ ...product, selPricing: e.target.value }))
    }

    setValue(e.target.value)
    onSelect(e.target.value)
  }

  useEffect(() => {
    if (product.selPricing) {
      setValue(product.selPricing)
    }

    if (productFromCart && productFromCart.selPricing) {
      setValue(productFromCart.selPricing)
    }
  }, [productFromCart?.selPricing])
  
  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="pricing_select">Pricing</InputLabel>
      <Select
        labelId="pricing_select"
        id="pricing_select"
        value={value}
        label="Pricing"
        onChange={(e) => onChange(e)}
      >
        {product?.pricing.map((pr, ind) =>
          <MenuItem key={ind} value={JSON.stringify(pr)}>
            {`$${pr.price} / ${pr.price_per}`}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

export default PricingSelect
