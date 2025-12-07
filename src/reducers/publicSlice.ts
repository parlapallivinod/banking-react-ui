import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import { createAppAsyncThunk, type Status } from '../app/withTypes'
import {client as axiosClient} from '../service/axiosInstances';
import type { LoginFormValues } from '../components/public/Login'
import type { RegisterFormValues } from '../components/public/Register';


export const login = createAppAsyncThunk('public/login', async (payload: LoginFormValues, thunkApi) => {
    const response = await axiosClient.get('/v1/customers', {
        headers: {
            "Authorization": "Basic " + btoa(payload.username + ":" + payload.password),
        },
    });
    console.log('Login response:', response);
    return response;
})


export const register = createAppAsyncThunk('public/register', async (payload: RegisterFormValues, thunkApi) => {
    const response = await axiosClient.post('/v1/customers/registration',
      {username: payload.username, password: payload.password},
      {
        headers: {
        "Content-Type": "application/json;"
      }}
    );
    console.log('Register response:', response);
    return response;
})


// Define a type for the slice state
interface PublicState {
  status: Status,
  error: string | null

}

// Define the initial state using that type
const initialState: PublicState = {
  status: 'idle',
  error: null
}

export const publicSlice = createSlice({
  name: 'public',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  }
})

export const { } = publicSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default publicSlice.reducer
