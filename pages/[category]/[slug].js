import { useRouter } from 'next/router'

const ProductPage = ({}) => {
  const router = useRouter()
  const { slug } = router.query
  return <div> {slug} Slug </div>
}

export default ProductPage
