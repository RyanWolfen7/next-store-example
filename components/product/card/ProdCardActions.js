import { removeFromCart } from '../../../store/cart/reducer'
import Link from 'next/link'
import { Box } from '@mui/system'
import { Button, CardActions, IconButton, Typography } from '@mui/material'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import styles from '../../../styles/ProductCard.module.scss'
import PricingSelect from './PricingSelect'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import ProdCardPrice from './ProdCardPrice'
import AddToCartButton from './AddToCartButton'

const categoryRoutes = {
  class: 'courses',
  indicator: 'indicators',
  membership: 'memberships'
}

const ProdCardActions = ({ product, inCart, isCartPage, variant, onPriceSelect }) => {
  const [selPricing, setSelPricing] = useState('')
  const [pendingUpdate, setPendingUpdate] = useState(false)
  const isLined = product.isDiscounted ? 'line-through' : 'none'
  const priceWeight = product.isDiscounted ? 400 : 700
  const isVerticalCard = variant === 'vertical'
  const dispatch = useDispatch()
  const passPricing = (value) => {
    setSelPricing(value)
  }
  const isPendingUpdate = (newValue) => {
    setPendingUpdate(newValue)
  }

  function LearnMore() {
    if (!isCartPage) {
      return (
        <Button sx={{ textTransform: 'none' }} color="main">
          <Link
            href={{
              pathname: `/${categoryRoutes[product.__typename.toLowerCase()]}/${product.slug}`,
              query: product
            }}>
              Learn More
          </Link>
        </Button>
      )
    }
  }

  function CartButton() {
    if (!isCartPage) {
      if (inCart) {
        return (
          <IconButton
            aria-label="add"
            size="small"
            onClick={() => dispatch(removeFromCart({ ...product }))}
          >
            <RemoveShoppingCartIcon color="text_color" fontSize="medium" />
          </IconButton>
        )
      } else {
        return (
          <AddToCartButton product={ product } 
            selPricing={ selPricing } 
            isPendingUpdate={ isPendingUpdate }
            pendingUpdate={ pendingUpdate }
          />
        )
      }
    } else {
      return (
        <IconButton
          aria-label="delete" 
          color="text_color" 
          onClick={() => dispatch(removeFromCart({ ...product }))}
          sx={{ borderRadius: 2,  p: 0}}
        >
          <DeleteForeverIcon />
          <Typography>Remove</Typography>
        </IconButton>
      )
    }
  }

  return (
    <CardActions
      className={styles.card_actions}
      sx={{
        display: 'flex',
        justifyContent: !isCartPage ? (isVerticalCard ? 'space-between' : 'flex-end') : 'flex-start',
        pb: 2,
        px: 2,
        alignItems: 'center'
      }}
    >
      {
        product.__typename === 'Membership' ?
          <PricingSelect product={product} onSelect={passPricing} /> :
          (isVerticalCard && <ProdCardPrice product={product} />)
      }
      <Box>
        <LearnMore />
        <CartButton />
      </Box>
    </CardActions>
  )
}

export default ProdCardActions
