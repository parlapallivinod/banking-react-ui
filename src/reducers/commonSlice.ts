import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface CommonState {
  loadingSpinner: boolean
}

// Define the initial state using that type
const initialState: CommonState = {
  loadingSpinner: false
}

export const commonSlice = createSlice({
  name: 'common',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showLoadingSpinner: state => {
      state.loadingSpinner = true
    },
    hideLoadingSpinner: state => {
      state.loadingSpinner = false
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLoadingSpinner: (state, action: PayloadAction<boolean>) => {
      state.loadingSpinner = action.payload
    }
  }
})

export const { showLoadingSpinner, hideLoadingSpinner, setLoadingSpinner } = commonSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLoadingSpinner = (state: RootState) => state.common.loadingSpinner

export default commonSlice.reducer
