import { useFormik, type FormikHelpers } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks';
import type { RequestStatus } from '../../app/withTypes';
import RequestStatusComponent from '../RequestStatusComponent';
import { getTransactionHistory } from '../../reducers/customerSlice';
import { DataGrid, type  GridRowsProp, type GridColDef } from '@mui/x-data-grid';

const validationSchema = yup.object({
 });

export interface TransactionHistoryFormValues {
}

interface Transaction {
  id: number,
  type: string,
  amount: number,
  fromUser: string | null
  toUser: string | null
  status: string,
  message: string | null
  createdTime: string,
}

function toTransactions(rows: any[]): Transaction[] {
  let transactions: Transaction[] = [];

  for(var i=0; i<rows.length; i++) {
    let row = rows[i];
    let transaction: Transaction = {
      id: row.id,
      type: row.type,
      amount: row.amount,
      fromUser: row.fromUser? row.fromUser.username : null,
      toUser: row.toUser? row.toUser.username : null,
      status: row.status,
      message: row.message,
      createdTime: row.createdTime,
    };
    transactions.push(transaction);
  }
  return transactions
}



export default function TransactionHistory() {
  const [status, setStatus] = useState<RequestStatus | null>(null);
  const initialTransactionHisotryFormValues: TransactionHistoryFormValues = {};
  const dispatch = useAppDispatch();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const rows: GridRowsProp = [
    { id: 1, name: 'Data Grid', description: 'the Community version' },
    { id: 2, name: 'Data Grid Pro', description: 'the Pro version' },
    { id: 3, name: 'Data Grid Premium', description: 'the Premium version' },
  ];

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'string' },
    { field: 'type', headerName: 'Transaction Type', type: 'string' },
    { field: 'amount', headerName: 'Amount', type: 'number' },
    { field: 'fromUser', headerName: 'From User', type: 'string' },
    { field: 'toUser', headerName: 'To User', type: 'string' },
    { field: 'status', headerName: 'Status',type: 'string' },
    { field: 'message', headerName: 'Message', type: 'string' },
    { field: 'createdTime', headerName: 'Created Time', type: 'string' },
  ];

  const submitForm = async (values: TransactionHistoryFormValues, actions: FormikHelpers<TransactionHistoryFormValues>) => {
    console.log('Transaction History Request: ', JSON.stringify(values, null, 2))
    setStatus(null);
    setTransactions([]);
    try {
      let response = await dispatch(getTransactionHistory(values)).unwrap()
      
      if(response.status == 200) {
        setTransactions(toTransactions(response.data.transactions));
        console.log("transactions: ", transactions);
        setStatus({message: "Refreshed transaction history successfully",
          type: "success"
        });
      } else if(response.status === 400) {
        setStatus({message: response.data.message + ": " + response.data.details, type: 'error'});
      } else {
        setStatus({message: JSON.stringify(response.data, null, 2), type: 'error'});
      }
    } catch (err: any) {
      console.error('Transaction History Failed: ', err)
      setStatus({message: err.message, type: 'error'})
    } finally {
      actions.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: initialTransactionHisotryFormValues,
    validationSchema: validationSchema,
    onSubmit: submitForm,
  });

  useEffect(() => {
    formik.submitForm();
  }, []);

  return (
    <div>
      <RequestStatusComponent status={status} setStatus={setStatus} />

      <Container maxWidth={false}>
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h5" component="h5" sx={{my:4, textAlign:'center', }}> Transaction History &nbsp; &nbsp;
            <Button
                color='secondary'
                variant='contained' 
                type="submit"
                loading={Boolean(formik.isSubmitting)} loadingPosition="start">
                Refresh
              </Button>
          </Typography>
  
          <Grid container spacing={2} sx={{mt:2}}>
            <Grid size={{xs:12, sm:10}} offset={{xs:0, sm:1}} sx={{height: '70vh'}}>
            
              <DataGrid rows={transactions} columns={columns} loading={formik.isSubmitting} 
                showToolbar
              />
              
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}