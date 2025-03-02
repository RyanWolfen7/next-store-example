import {
  Typography,
  CardContent
} from '@mui/material'
import { Box } from '@mui/system'
import styles from '../../../styles/ProductCard.module.scss'
import ProdCardPrice from './ProdCardPrice'

const ProdCardContent = ({ product, isCartPage, variant }) => {
  return (
    <CardContent>
      <Box className={styles.card_title}>
        <Typography variant="h6" sx={{ pr: 2 }}>
          <strong>{product.name}</strong>
        </Typography>
        {
          (variant === 'horizontal' && product.__typename !== 'Membership') &&
          <Box sx={{ mt: .5 }}><ProdCardPrice product={product} /></Box>
        }
      </Box>
      {!isCartPage ?
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
          sx={{ maxWidth: 500 }}
        >
          {product.description}
        </Typography>
        : ''}

    </CardContent>
  )
}

export default ProdCardContent
