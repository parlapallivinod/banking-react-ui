import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import commonReducer from '../reducers/commonSlice'
import publicReducer from '../reducers/publicSlice'
import customerReducer from '../reducers/customerSlice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    public: publicReducer,
    customer: customerReducer
  }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>