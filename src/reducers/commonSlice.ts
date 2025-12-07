import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
interface CommonState {
  loading: boolean
}

// Define the initial state using that type
const initialState: CommonState = {
  loading: false
}

export const commonSlice = createSlice({
  name: 'common',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showLoadingSpinner: state => {
      state.loading = true
    },
    hideLoadingSpinner: state => {
      state.loading = false
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLoading: (state: CommonState, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  }
})

export const { showLoadingSpinner, hideLoadingSpinner, setLoading } = commonSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLoadingSpinner = (state: RootState) => state.common.loading

export default commonSlice.reducer
