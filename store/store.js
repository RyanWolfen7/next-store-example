import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import cartReducer from './cart/reducer'
import filtersReducer from './filters/reducer'
import systemReducer from './system/reducer'
import userReducer from './user/reducer'

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  cart: cartReducer,
  filters: filtersReducer,
  system: systemReducer,
  user: userReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)
