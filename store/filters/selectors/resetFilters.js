const resetFiltersSelector = (state) => {
    state.filters = {
        markets: [],
        traders: [],
        platforms: [],
        price: -1,
        active: 0
    }
}

export default resetFiltersSelector
