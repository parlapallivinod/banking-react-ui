import { useFormik, type FormikHelpers } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useState } from 'react'
import { useAppDispatch } from '../../app/hooks';
import type { RequestStatus } from '../../app/withTypes';
import RequestStatusComponent from '../RequestStatusComponent';
import { deleteAccount } from '../../reducers/customerSlice';

const validationSchema = yup.object({
});

export interface DeleteAccountFormValues {
}

export default function DeleteAccount() {
  const initialDeleteAccountFormValues: DeleteAccountFormValues = {};
  const [status, setStatus] = useState<RequestStatus | null>(null);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: initialDeleteAccountFormValues,
    validationSchema: validationSchema,
    onSubmit: async (values: DeleteAccountFormValues, actions: FormikHelpers<DeleteAccountFormValues>) => {
      console.log('Delete Account Request: ', JSON.stringify(values, null, 2))
      setStatus(null);
      try {
        let response = await dispatch(deleteAccount(values)).unwrap()
        
        if(response.status === 204) {
          setStatus({message: "Account deleted successfully",type: "success"});
        } else if(response.status === 400) {
          setStatus({message: response.data.message + ": " + response.data.details, type: 'error'});
        } else {
          setStatus({message: JSON.stringify(response.data, null, 2), type: 'error'});
        }
      } catch (err: any) {
        console.error('Delete Account Failed: ', err)
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
        <Typography variant="h5" component="h5" sx={{my:2, textAlign:'center'}}> Delete Account </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{xs:12, sm:10, md: 6, lg:4}} offset={{xs:0, sm:1, md:3, lg:4}}>
              <Typography variant="h6" component="h6">Are you sure to delete your account?</Typography>
					    <span>Note: Accounts with non zero balance cannot be deleted.</span>
            </Grid>
            <Grid size={{xs:12, sm:10, md: 6, lg:4}} offset={{xs:0, sm:1, md:3, lg:4}}>
              <Button size='large' 
                color="secondary" 
                variant="contained" 
                fullWidth 
                type="submit"
                loading={Boolean(formik.isSubmitting)} loadingPosition="start">
                Delete Account
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};