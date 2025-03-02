import { IconButton } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { useMutation } from '@apollo/client'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { addToCart, loadCartId } from '../../../store/cart/reducer'
import CREATE_CART from '../../../graphql/mutations/createCart'
import UPDATE_CART from '../../../graphql/mutations/updateCart'
import { formatCartItemsToStrapi } from '../../../utils/functions/cart'


const AddToCartButton = ({ product, selPricing, isPendingUpdate, pendingUpdate }) => {
  const { user } = useSelector(state => state.user)
  const { cart, cartId } = useSelector(state => state.cart)
  const currentDate = new Date()
  const isMembership = product.__typename === 'Membership'
  const dispatch = useDispatch()

  const [createCart] = useMutation(CREATE_CART, {
    onCompleted: (newCart) => {
      console.log(newCart.data)
      dispatch(loadCartId({id: newCart.createCart.data.id}))
    }
  })

  const [updateCart] = useMutation(UPDATE_CART, {
    // variables: { updateCartId: id, data: data },
    onCompleted: (data) => {
      console.log(data)
    }
  })

  useEffect(() => {
    if (user.token && pendingUpdate) { // if user is logged in
      const cartItems = formatCartItemsToStrapi(cart)
      if (cartId != -1) { // cart exist on strapi
        const data = {
          'cartItems': cartItems,
          'userEmail': user.email,
          'userName': user.name,
          'publishedAt': document.write(currentDate.toISOString())
        }
        console.log('Updating cart on Strapi.....')
        updateCart({
          variables: { updateCartId: cartId, data: data }
        })
        isPendingUpdate(false)

      } else if (cartId == -1 && cart.length > 0) { // cart doesn't exist on strapi
        const data = {
          'cartItems': cartItems,
          'userEmail': user.email,
          'userName': user.name,
          'publishedAt': document.write(currentDate.toISOString())
        }
        console.log('Creating cart on Strapi.....')
        createCart({
          variables: { data: data }
        })
        isPendingUpdate(false)
      }
    } 
  }, [user, cart, cartId, createCart, pendingUpdate, isPendingUpdate])

  const addToCartHandler = () => {
    if ((selPricing && isMembership) || !isMembership) {
      dispatch(addToCart({ ...product, selPricing: selPricing }))
      isPendingUpdate(true)
    } else {
      alert('Please select pricing first.')
    }
  }

  return (
    <IconButton
      aria-label="add"
      size="small"
      onClick={ addToCartHandler }
    >
      <AddShoppingCartIcon color="accent" fontSize="medium" />
    </IconButton>
  )
}

export default AddToCartButton
