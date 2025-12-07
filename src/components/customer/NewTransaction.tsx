import { useFormik, type FormikHelpers } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { RequestStatus } from '../../app/withTypes';
import RequestStatusComponent from '../RequestStatusComponent';
import MenuItem from '@mui/material/MenuItem';
import { performTransaction, selectCustomer, type Customer } from '../../reducers/customerSlice';
import { login } from '../../reducers/publicSlice';

const validationSchema = yup.object({
  type: yup
    .string()
    .required('Transaction Type is required')
    .oneOf(['DEPOSIT', 'WITHDRAW', 'TRANSFER'], 'Invalid Transaction Type'),
  amount: yup
    .number()
    .required('Amount is required')
    .min(1, 'Amount should be at least 1'),
  toUser: yup
    .string()
});

export interface NewTransactionFormValues {
  type: string,
  amount: string
  toUser: string
}

const validate = (values: NewTransactionFormValues) => {
  const errors = {};
  if((values.type === 'TRANSFER') && !values.toUser)
    errors.toUser= 'To User is required for TRANSFER transaction';
  return errors;

};

export default function NewTransaction() {
  const customer: Customer | null = useAppSelector(selectCustomer);
  const initialNewTransactionFormValues: NewTransactionFormValues = {type: '', amount: '', toUser: ''};
  const [status, setStatus] = useState<RequestStatus | null>(null);
  const toUserTypes: string[] = ["DEPOSIT", "TRANSFER"];
  const types: string[] = ["DEPOSIT", "WITHDRAW", "TRANSFER"];

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: initialNewTransactionFormValues,
    validate,
    validationSchema: validationSchema,
    onSubmit: async (values: NewTransactionFormValues, actions: FormikHelpers<NewTransactionFormValues>) => {
      console.info('New Transaction Request: ', JSON.stringify(values, null, 2))
      setStatus(null);
      try {
        let response = await dispatch(performTransaction(values)).unwrap()
        
        if(response.status === 201) {
          if(response.data.status == "SUCCESS") {
            setStatus({message: "Transaction successful", type: "success"});
          } else if(response.data.status == "FAILURE") {
            setStatus({message: "Transaction failed. " + response.data.message, type: "error"});
          }

          actions.resetForm();
          await dispatch(login({username: customer!.username, password: customer!.password})).unwrap()
        } else if(response.status === 400) {
          setStatus({message: response.data.message + ": " + response.data.details, type: 'error'});
        } else {
          setStatus({message: JSON.stringify(response.data, null, 2), type: 'error'});
        }
      } catch (err: any) {
        console.error('New Transaction Failed: ', err)
        setStatus({message: err.message, type: 'error'})
      } finally {
        actions.setSubmitting(false);
      }
      
    },
  });

  return (
    <div>
      <RequestStatusComponent status={status} setStatus={setStatus} />

      <Container maxWidth={false}>
        <Typography variant="h5" component="h5" sx={{my:2, textAlign:'center'}}> New Transaction </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{xs:12, sm:10, md: 6, lg:4}} offset={{xs:0, sm:1, md:3, lg:4}}>
              <TextField
                select
                fullWidth
                id="type"
                name="type"
                label="Transaction Type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
              >
                {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{xs:12, sm:10, md: 6, lg:4}} offset={{xs:0, sm:1, md:3, lg:4}}>
              <TextField
                type="number"
                fullWidth
                id="amount"
                name="amount"
                label="Amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
            </Grid>
           
            <Grid size={{xs:12, sm:10, md: 6, lg:4}} offset={{xs:0, sm:1, md:3, lg:4}} 
              sx={{display: toUserTypes.includes(formik.values.type)? 'block': 'none',}}>
              <TextField
                fullWidth
                id="toUser"
                name="toUser"
                label="To User"
                value={formik.values.toUser}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.toUser && Boolean(formik.errors.toUser)}
                helperText={formik.touched.toUser && formik.errors.toUser}
              />              
            </Grid>
            <Grid size={{xs:12, sm:10, md: 6, lg:4}} offset={{xs:0, sm:1, md:3, lg:4}}>
              <Button size='large' 
                color="secondary" 
                variant="contained" 
                fullWidth 
                type="submit"
                loading={Boolean(formik.isSubmitting)} loadingPosition="start">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};