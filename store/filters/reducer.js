import { createSlice } from '@reduxjs/toolkit'
import {
    addFilterSelector,
    removeFilterSelector,
    resetFiltersSelector,
} from './selectors'

const initialState = {
    filters: {
        markets: [],
        traders: [],
        platforms: [],
        price: -1,
        active: 0
    },
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        addFilter: addFilterSelector,
        removeFilter: removeFilterSelector,
        resetFilters: resetFiltersSelector,
    }
})
  
// Action creators are generated for each case reducer function
export const { 
    addFilter,
    removeFilter, 
    resetFilters,
} = filterSlice.actions

export default filterSlice.reducer
