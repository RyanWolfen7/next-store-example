import { Typography, Box } from '@mui/material'

const ProdCardPrice = ({ product }) => {
  const isLined = product.isDiscounted ? 'line-through' : 'none'
  const priceWeight = product.isDiscounted ? 400 : 700

  return (
    <Box>
      <Typography
        sx={{
          textDecoration: isLined,
          pb: '0!important',
          fontWeight: priceWeight,
          textAlign: 'right',
          fontSize: 17
        }}
      >
        ${product.price}
      </Typography>
      {product.isDiscounted && <>
        <Typography sx={{ width: 'max-content', pb: 0, fontSize: 14 }}>
          {product.discount}
        </Typography>
        <Typography sx={{ pb: 0, textAlign: 'right', fontSize: 17 }}>
          <strong>${product.discountedPrice}</strong>
        </Typography>
      </>}
    </Box>
  )
}

export default ProdCardPrice
