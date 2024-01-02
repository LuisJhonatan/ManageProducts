import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import firstLoginReducer from './slices/firstLoginSlice'
import carReducer from './slices/carContentSlice'

export const store = configureStore({
  reducer: {
    user : userReducer,
    firstLogin : firstLoginReducer,
    car: carReducer
  },
})