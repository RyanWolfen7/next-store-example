export const parseSingleCouponData = (data) => {
  if (!data) { return true }
  const {
    coupons: {
      data: [{ attributes } = {}]
    }
  } = data 
  return attributes
}

// Takes a coupon object and returns all associated slugs by string in an array
export const getCouponProductRelationSlugs = (coupon) => {
  const { bundles, classes, indicators, memberships } = coupon
  let relations = []
  if (bundles?.data.length > 0) { relations = [...relations, ...bundles.data] }
  if (classes?.data.length > 0) { relations = [...relations, ...classes.data] }
  if (indicators?.data.length > 0) { relations = [...relations, ...indicators.data] }
  if (memberships?.data.length > 0) { relations = [...relations, ...memberships.data] }
  return relations.map(relation => relation?.attributes.slug)
}
