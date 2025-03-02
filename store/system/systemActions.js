import { createAsyncThunk } from '@reduxjs/toolkit'

export const getCategories = createAsyncThunk(
  'system/getCategories',
  async(args, { getState }) => {
    const { categories } = getState().system
    if ( !categories.isLoading ) { return }
    const response = await fetch('/api/category')
      .then((response) => response.json())
      .then((data) => {
        return data
      })
    return response
  }
)
