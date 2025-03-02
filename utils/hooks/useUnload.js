import { useEffect } from 'react'
import { useRouter } from 'next/router'

const handleWindowClose = (e) => {
  // Abandoned Cart call
  // console.log(e)
  // e.preventDefault()
  // console.log(window.location.origin.toString())
  // return (e.returnValue = 'Are you sure you want to leave?')
}

let leaveConfirmed = false

export const useLeavePrevention = (setIsAbandonedCart) => {
  const router = useRouter()
  // Use beforeunload to prevent closing the tab, refreshing the page or moving outside the Next app
  useEffect(() => {
    window.addEventListener('beforeunload', handleWindowClose)

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose)
    }
  })

  router.events.on('routeChangeStart', () => {
    setIsAbandonedCart(true)
  })

  // Set the module variable to false on component mount
  useEffect(() => {
    leaveConfirmed = false
  }, [])
}
