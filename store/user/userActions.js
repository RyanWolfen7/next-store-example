/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getUserJWT = createAsyncThunk(
  'user/getUserJWT',
  async(args, { getState }) => {
    const { username, password, recaptcha_token } = args.credentials
    try {
      const rawResponse = await fetch(
        process.env.NEXT_PUBLIC_JWT_API, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Credentials, Access-Control-Allow-Origin'
          },
          body: JSON.stringify({
            username, 
            password,
            recaptcha_token
          })
        }
      )
      
      const response = await rawResponse.json()
      return response
    } catch (err) {
      return console.log(err)
    }
  }
)

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async(args, { getState }) => {
    const { first_name, last_name, email } = args.credentials
    try {
      const rawResponse = await fetch(
        process.env.NEXT_PUBLIC_REGISTER_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'first_name': first_name, 
            'last_name': last_name,
            'email': email
          })
        }
      )
      
      const response = await rawResponse.json()
      return response
    } catch (err) {
      return console.log(err)
    }
  }
)
