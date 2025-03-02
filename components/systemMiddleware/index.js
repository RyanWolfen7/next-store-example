import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useUnload, { useLeavePrevention } from '../../utils/hooks/useUnload'
import { useSelector } from 'react-redux'
import useTimoutTimer from '../../utils/hooks/useTimoutTimer'
import { useMutation } from '@apollo/client'
import FIRE_ABANDONED_CART from '../../mocks/abandonCart'

const SystemMiddleWare = ({children}) => {
  const { user: { user }, cart: { cart, cartId, coupons} } = useSelector(state => state)
  const [ isAbandonedCart, setIsAbandonedCart ] = useState(false)
  const [abandonCart, {data, loading, error}] = useMutation(FIRE_ABANDONED_CART)
  useLeavePrevention(setIsAbandonedCart)
  useTimoutTimer(setIsAbandonedCart, (1000 * 60 * 60), true) // 1h
  useEffect(() => {
    const memberships = cart?.filter(item => item.__typename === 'Membership')
    const classes = cart?.filter(item => item.__typename === 'Class')
    const indicators = cart?.filter(item => item.__typename === 'Indicator')
    const abandonCartObject = {
      cartItems: {
        classes,
        indicators,
        memberships
      },
      cartCoupons: coupons,
      userName: user.name,
      userEmail: user.email
    }

    if (cart.length && isAbandonedCart) {
      setIsAbandonedCart(false)
      abandonCart({variables: abandonCartObject})
    }
  },[isAbandonedCart])
  
  return <>
    {children}
  </>
}

export default SystemMiddleWare
