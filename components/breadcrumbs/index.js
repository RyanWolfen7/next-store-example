import { useRouter } from 'next/router'
import { Container, Box, Link, Breadcrumbs, Typography, CircularProgress } from '@mui/material'
import GET_PRODUCT from '../../mocks/product-by-slug'
import { useQuery } from '@apollo/client'

const BreadCrumbs = () => {
  const router = useRouter()
  const { slug, category } = router.query
  const { error, data } = useQuery(GET_PRODUCT, {
    variables: { slug }
  })

  const categories = {
    courses: 'classes',
    indicators: 'indicators',
    memberships: 'memberships'
  }
  
  if (error) { return console.log(error) }

  const [asPathWithoutQuery] = router.asPath.split('?')
  const asPathNestedRoutes = asPathWithoutQuery.split('/')
    .filter(v => v.length > 0)

  const crumblist = asPathNestedRoutes.map((subpath, idx) => {
    const href = `/${asPathNestedRoutes.slice(0, idx + 1).join('/')}`
    const text = subpath
    return { href, text }
  })

  const breadcrumbs = [{ href: '/', text: 'Store' }, ...crumblist]

  const prod = slug && data?.products.data[0]?.attributes[categories[category]]?.data[0].attributes
  
  if (breadcrumbs.length > 1) {
    return (
      <Container sx={{ px: 2 }} disableGutters maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbs.map((crumb, idx) => (
            <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} prod={prod} />
          ))}
        </Breadcrumbs>
      </Container>
    )
  }

  return
}

function Crumb({ text, href, last = false, prod}) {
  if (last) {
    return <Typography color="text.primary" sx={{textTransform: (!prod ? 'capitalize' : '')}}>
      {prod ? prod.name : text}
    </Typography>
  }

  return (
    <Link underline="hover" color="inherit" sx={{textTransform: 'capitalize'}} href={href}>
      {text}
    </Link>
  )
}

export default BreadCrumbs
