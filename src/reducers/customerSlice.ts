import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import { login } from './publicSlice'
import { createAppAsyncThunk, type Status } from '../app/withTypes'
import type { UpdatePasswordFormValues } from '../components/customer/UpdatePassword'
import {client as axiosClient} from '../service/axiosInstances';
import type { DeleteAccountFormValues } from '../components/customer/DeleteAccount'
import type { NewTransactionFormValues } from '../components/customer/NewTransaction'
import type { TransactionHistoryFormValues } from '../components/customer/TransactionHistory'

export const updatePassword = createAppAsyncThunk('customer/updatePassword', async (payload: UpdatePasswordFormValues, thunkApi) => {
    const customer = selectCustomer(thunkApi.getState());
    const response = await axiosClient.put('/v1/customers',
      {username: customer!.username, password: payload.newPassword},
      {
        headers: {
        "Authorization": "Basic " + btoa(customer!.username + ":" + customer!.password),
        "Content-Type": "application/json;"
      }}
    );
    console.log('Update Password response:', response);
    return response;
})

export const deleteAccount = createAppAsyncThunk('customer/deleteAccount', async (payload: DeleteAccountFormValues, thunkApi) => {
    const customer = selectCustomer(thunkApi.getState());
    const response = await axiosClient.delete('/v1/customers',
      {
        headers: {
        "Authorization": "Basic " + btoa(customer!.username + ":" + customer!.password),
      }}
    );
    console.log('Delete Account response:', response);
    return response;
})

export const performTransaction = createAppAsyncThunk('customer/performTransactin', async (payload: NewTransactionFormValues, thunkApi) => {
    const customer = selectCustomer(thunkApi.getState());
    let transaction = {
        amount: payload.amount,
        type: payload.type
    };
    if (payload.type == "TRANSFER" || (payload.type == "DEPOSIT" && payload.toUser != "")) {
        transaction.toUser = {};
        transaction.toUser.username = payload.toUser;
    }
    const response = await axiosClient.post('/v1/customers/transactions',
      transaction,
      {
        headers: {
        "Authorization": "Basic " + btoa(customer!.username + ":" + customer!.password),
      }}
    );
    console.log('New Transaction response:', response);
    return response;
})

export const getTransactionHistory = createAppAsyncThunk('customer/getTransactionHistory', async (payload: TransactionHistoryFormValues, thunkApi) => {
    const customer = selectCustomer(thunkApi.getState());
    const response = await axiosClient.get('/v1/customers/transactions?pageSize=1000000&pageNumber=0',
      {
        headers: {
        "Authorization": "Basic " + btoa(customer!.username + ":" + customer!.password),
      }}
    );
    console.log('Transaction History response:', response);
    return response;
})

// Define a type for the slice state
export interface Customer {
  username: string,
  password: string,
  balance: number
  createdTime: string,
  lastUpdatedTime: string | null
}

interface CustomerState {
  customer: Customer | null
  status: Status,
  error: string | null

}

// Define the initial state using that type
const initialState: CustomerState = {
  customer: null,
  status: 'idle',
  error: null
}

export const customerSlice = createSlice({
  name: 'cuomer',
  initialState,
  reducers: {
    logout: (state: CustomerState) => {
      state.customer = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log("In customer slice, customer : " , action.payload.data)
        if(action.payload.status === 200)
          state.customer = action.payload.data;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        console.log("In customer slice, customer : " , action.payload.data)
        if(action.payload.status === 200)
          state.customer = action.payload.data;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        if(action.payload.status === 204)
          state.customer = null
      })
      
  },
})

export const { logout} = customerSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCustomer = (state: RootState) => state.customer.customer;
export const selectUsername = (state: RootState) => state.customer.customer?.username;
export const selectPassword = (state: RootState) => state.customer.customer?.password;
export const selectBalance= (state: RootState) => state.customer.customer?.balance;

export default customerSlice.reducer
