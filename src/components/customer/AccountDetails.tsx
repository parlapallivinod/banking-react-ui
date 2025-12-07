import { useFormik, type FormikHelpers } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react'
import { login } from '../../reducers/publicSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { RequestStatus } from '../../app/withTypes';
import RequestStatusComponent from '../RequestStatusComponent';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { selectCustomer, type Customer } from '../../reducers/customerSlice';
import { useNavigate } from 'react-router';

const validationSchema = yup.object({
 });

export interface AccountFormValues {
}

export default function AccountDetails() {
  const [status, setStatus] = useState<RequestStatus | null>(null);
  const initialAccountFormValues: AccountFormValues = {};
  const customer: Customer | null = useAppSelector(selectCustomer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitForm = async (values: AccountFormValues, actions: FormikHelpers<AccountFormValues>) => {
    console.log('Refresh Request: ', JSON.stringify(values, null, 2))
    setStatus(null);
    try {
      let response = await dispatch(login({username: customer!.username, password: customer!.password})).unwrap()
      
      if(response.status == 200) {
        setStatus({message: "Refreshed account details successfully",
          type: "success"
        });
      } else if(response.status == 401) {
        navigate('/login');
      } else {
        setStatus({message: JSON.stringify(response.data, null, 2), type: 'error'});
      }
    } catch (err: any) {
      console.error('Refresh Failed: ', err)
      setStatus({message: err.message, type: 'error'})
    } finally {
      actions.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: initialAccountFormValues,
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
          <Typography variant="h5" component="h5" sx={{my:4, textAlign:'center', }}> Account Details &nbsp; &nbsp;
            <Button
                color='secondary'
                variant='contained' 
                type="submit"
                loading={Boolean(formik.isSubmitting)} loadingPosition="start">
                Refresh
              </Button>
          </Typography>
  
          <Grid container spacing={2} sx={{mt:2}}>
            <Grid size={{xs:12, sm:10, md: 8, lg:6}} offset={{xs:0, sm:1, md:2, lg:3}}>
              <TableContainer component={Paper} elevation={5}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell>{customer?.username}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Balance</TableCell>
                      <TableCell color='red' sx={{fontSize:'1.5rem', color:'blue'}}>{customer?.balance}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Created Time</TableCell>
                      <TableCell>{customer?.createdTime}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Last Updated Time</TableCell>
                      <TableCell>{customer?.lastUpdatedTime?? "Null"}</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}