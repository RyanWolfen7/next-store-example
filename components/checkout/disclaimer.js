import { Typography } from '@mui/material'

const Disclaimer = () => {
  return (
    <Typography variant="body2" sx={{ pt: 2, lineHeight: 1.75 }}>
        This is a continuous subscription, and your membership will continue until you cancel.
        The payment method you provided will be charged the recurring amount listed above at the 
        end of your trial and will be charged the then market rate for the membership for the 
        period you selected (monthly, quarterly, annual) thereafter. You can cancel at any time 
        before your billing date by emailing
      <a href = "mailto:support@next-store-example.tech"> support@next-store-example.tech</a> or calling
      <a href="tel:8008675309"> 800-867-5309</a>. Your subscription will continue until the 
        end of the billing period in which you canceled.
    </Typography>
  )
}

export default Disclaimer
