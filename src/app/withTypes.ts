import { createAsyncThunk } from '@reduxjs/toolkit'

import type { RootState, AppDispatch } from './store'
import type {AlertProps} from '@mui/material/Alert'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>();

export type Status = 'idle' | 'pending' | 'succeeded' | 'rejected';

export interface RequestStatus {
  message?: string,
  type?: AlertProps["severity"],
}
