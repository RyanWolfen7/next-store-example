import { createSlice } from '@reduxjs/toolkit'
import { getCategories } from './systemActions'

const initialState = {
  categories: {
    list: [],
    isLoading: false,
    error: null
  }
}

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {},
  extraReducers: {
    // refactor this into selectors
    [getCategories.pending]: (state, action) => { state.categories.isLoading = true },
    [getCategories.fulfilled]: (state, action) => {
      if (state.categories.isLoading) {
        state.categories.list = action.payload
        state.categories.isLoading = false
      }
    },
    [getCategories.rejected]: (state, action) => {
      if (state.categories.isLoading) {
        state.categories.isLoading = false
        state.categories.error = action.error
      }
    }
  }  
})
  
// Action creators are generated for each case reducer function
export const { getSystemCategories } = systemSlice.actions

export default systemSlice.reducer
