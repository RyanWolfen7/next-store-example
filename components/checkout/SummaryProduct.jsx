import {
  Typography, ListItem, CardMedia, Button, Box
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../store/cart/reducer'

const SummaryProduct = ({ product }) => {
  const isLined = product.isDiscounted ? 'line-through' : 'none'
  const priceWeight = product.isDiscounted ? 400 : 700
  const dispatch = useDispatch()
  const { price, price_per } = product.selPricing && JSON.parse(product.selPricing)
  return (
    <ListItem alignItems="flex-start"
      sx={{ borderBottom: '1px solid #ddd', width: '100%', pt: 3, pb: 2.5, px: 0 }}>
      <Box>
        <CardMedia
          sx={{ width: '80px', height: '60px' }}
          image={product.img}
          alt={product.name}
        />
        <Button
          sx={{ py: 0, px: 0.5, textTransform: 'capitalize' }}
          onClick={() => dispatch(removeFromCart({ ...product }))}
          variant="link" size="small" startIcon={<DeleteOutlineIcon />}>
          Delete
        </Button>
      </Box>
      <Box
        sx={{ pl: 2, display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        <Typography>
          <strong>{product.name}</strong>
        </Typography>
        <Box sx={{ pl: 2 }}>
          <Typography
            sx={{
              textDecoration: isLined,
              pb: '0!important',
              fontWeight: priceWeight,
              textAlign: 'right'
            }}
          >
            ${price ? `${price} / ${price_per}` : product.price}
          </Typography>
          {product.isDiscounted && <>
            <Typography sx={{ width: 'max-content', pb: 0, fontSize: 12 }}>
              {product.discount}
            </Typography>
            <Typography sx={{ pb: 0, textAlign: 'right' }}>
              <strong>${product.discountedPrice}</strong>
            </Typography>
          </>}
        </Box>
      </Box>
    </ListItem>
  )
}

export default SummaryProduct
