const removeFilterSelector = (state,  { payload }) => {
    const filters = state.filters

    if(payload.type == 'price') {
        filters[payload.type] = -1
        state.filters = filters
    } else {
        if (filters.hasOwnProperty(payload.type)) {
            filters[payload.type] = filters[payload.type].filter(filter => {return filter.slug != payload.slug})
            state.filters = filters
        }
    }
}

export default removeFilterSelector
