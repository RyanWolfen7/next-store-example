import {
  Button, Card, CardMedia
} from '@mui/material'
import { Box } from '@mui/system'
import styles from '../../../styles/ProductCard.module.scss'
import ProdCardContent from './ProdCardContent'
import ProdCardActions from './ProdCardActions'

const ProductCard = ({
  product, // Object => Indicator, Bundle, Membership, Class  
  inCart,  // Bool => determins if in cart
  variant,  // String => vertical or horizontal
  isCartPage // Bool => determines if is cart page
}) => {

  return (
    <Card
      className={`
        ${isCartPage ? styles.inCart : ''} 
        ${variant === 'vertical' ? styles.vertical : styles.horizontal}`
      }
      sx={{
        display: { sm: 'flex' },
        alignItems: 'stretch',
        backgroundColor: 'white'
      }}
    >
      <CardMedia
        sx={{ width: '100%' }}
        image={product.img}
        alt={product.name}
        className={styles.card_img}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          width: '100%',
          flex: 'auto'
        }}>
        <ProdCardContent 
          product={product}
          isCartPage={isCartPage}
          variant={variant}
        />
        <ProdCardActions 
          product={product}
          inCart={inCart}
          isCartPage={isCartPage}
          variant={variant}
        />
      </Box>
    </Card>
  )
}

export default ProductCard
