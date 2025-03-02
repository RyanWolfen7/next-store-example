const addFilterSelector = (state, { payload }) => {
    const filters = state.filters
    const type = payload.type
    delete payload.type

    if(type == 'price') {
        filters[type] = {
            currentPrice: payload.price,
            maxPrice: payload.range.max
        }
        state.filters = filters
    } else {
        if (!filters[type].find(filter => {filter.slug === payload.slug})) {
            filters[type].push(payload)
            state.filters = filters
        }
    }
  }
  
  export default addFilterSelector
  