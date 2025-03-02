import { createSlice } from '@reduxjs/toolkit'
import { loginSelector, updateUserSelector, registerSelector } from './selectors'
import { getUserJWT, registerUser } from './userActions'

const initialState = {
  user: {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: updateUserSelector
  },
  extraReducers: {
    // refactor this into selectors
    [getUserJWT.pending]: (state, action) => { state.user.isLoading = true },
    [getUserJWT.fulfilled]: loginSelector,
    [registerUser.pending]: (state, action) => { state.user.isLoading = true },
    [registerUser.fulfilled]: registerSelector,
    [registerUser.rejected]: (state, action) => {
      if (state.user.isLoading) {
        state.user.isLoading = false
        state.user.error = action.error
      }
    }
  }  
})

// Action creators are generated for each case reducer function
export const { 
  login,
  updateUser
} = userSlice.actions

export default userSlice.reducer
