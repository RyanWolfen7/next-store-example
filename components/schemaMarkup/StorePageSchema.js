import Head from 'next/head'

const StorePageSchema = ({ products }) => {
  const { } = products
  const siteUrl = process.env.NEXT_PUBLIC_WP_DOMAIN
  const siteTitle = 'Trade'
  
  const org = `{
    "@id": "${siteUrl}#organization",
    "type": "Organization",
    "name": "${siteTitle}",
    "logo": {
      "@type": "ImageObject",
      "name": "${siteTitle} Logo",
      "width": "294",
      "height": "26",
      "url": "${siteUrl}/logo.png"
    } 
  }`

  const productList = `{
    "@type": "ItemList",
    "numberOfItems": "${products.length}",
    "itemListElement": [
      ${products.map((prod, ind) => `{
        "@type": "ListItem",
        "position": "${ind}",
        "item": {
          "@type": "Product",
          "name": "${prod.attributes.name}",
          "description": "",
          "image": {
            "@type": "ImageObject",
            "url": "${prod.attributes.product_details.thumbnail?.data.attributes.url}"
          },
          ${prod.attributes.price ? `"offers": {
            "@type": "Offer",
            "availability": "InStock",
            "price": "${prod.attributes.price}",
            "priceCurrency": "USD"
          }` : ``}
          ${prod.attributes.pricing ? `"offers": {
            "@type": "AggregateOffer",
            "offerCount": "${prod.attributes.pricing.length}",
            "priceCurrency": "USD",
            "lowPrice": "${prod.attributes.pricing[0].price}",
            "offers": [
              ${prod.attributes.pricing.map(pr =>  `{
                "@type": "Offer",
                "eligibleDuration": "${pr.price_per}",
                "price": "${pr.price}",
                "priceCurrency": "USD"
              }`)}
            ]
          }` : ``}
        }
      }`)}
    ]
  }`

  const schema = `{
    "@context":"https://schema.org/",
    "@graph": [
      {
        "@type":["OnlineStore", "CollectionPage", "ProductCollection"],
        "name":"${siteTitle}",
        "description": "Online Education",
        "sourceOrganization": ${org}
      },
      ${productList},
      ${org}
    ]
  }
  `

  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }}></script>
    </Head>)
}
export default StorePageSchema
