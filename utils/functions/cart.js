export const formatCartItemsToStrapi = (cart) => {
  let formatedCartItems = { 
    "classes": [],
    "indicators": [],
    "memberships": []
  }
  cart.map((product) => {
    if(product.id){
      switch (product.__typename) {
        case "Class":
          formatedCartItems.classes.push(product.id)
          break;
        case "Indicator":
          formatedCartItems.indicators.push(product.id)
          break;
        case "Membership":
          formatedCartItems.memberships.push(product.id)
          break;
        default:
          break;
      }
    }
  })
  return formatedCartItems
}