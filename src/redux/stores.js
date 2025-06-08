import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user/userSlice'

import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { productReducer } from './product/productSlice'
import { cartReducer } from './cart/cartSlice'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user', 'cart']
}

const reducers = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer
})

const persistedReducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})