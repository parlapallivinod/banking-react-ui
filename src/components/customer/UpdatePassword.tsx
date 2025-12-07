import { useFormik, type FormikHelpers } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { RequestStatus } from '../../app/withTypes';
import RequestStatusComponent from '../RequestStatusComponent';
import { selectPassword, updatePassword } from '../../reducers/customerSlice';

const validationSchema = yup.object({
  password: yup
    .string()
    .required('Current Password is required')
    .min(5, 'Current Password should be of minimum 5 characters length')
    .max(16, 'Current Password should be of maximum 16 characters length'),
  newPassword: yup
    .string()
    .required('New Password is required')
    .min(5, 'New Password should be of minimum 5 characters length')
    .max(16, 'New Password should be of maximum 16 characters length'),
  verifyNewPassword: yup
    .string()
    .required('Verify New Password is required')
    .min(5, 'Verify New Password should be of minimum 5 characters length')
    .max(16, 'Verify New Password should be of maximum 16 characters length')
});

export interface UpdatePasswordFormValues {
  password: string,
  newPassword: string,
  verifyNewPassword: string
}

export default function UpdatePassword() {
  const initialUpdatePasswordFormValues: UpdatePasswordFormValues = {password: '', newPassword: '' , verifyNewPassword: ''};
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showVerifyNewPassword, setShowVerifyNewPassword] = useState(false);
  const [status, setStatus] = useState<RequestStatus | null>(null);
  const presentPassword = useAppSelector(selectPassword);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowVerifyNewPassword = () => setShowVerifyNewPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const dispatch = useAppDispatch();

  const validate = (values: UpdatePasswordFormValues) => {
    const errors = {};
    
    if(values.password !== presentPassword)
      errors.password = 'Present Password, Password should  match'
    
    if(values.password === values.newPassword)
      errors.newPassword = 'Password, New Password should not match'
    
    if(values.newPassword !== values.verifyNewPassword)
      errors.verifyNewPassword = 'New Password, Verify New Password does not match'
    //console.log("validation errors: " + JSON.stringify(errors, null, 2));
    return errors;
 };

  const formik = useFormik({
    initialValues: initialUpdatePasswordFormValues,
    validate,
    validationSchema: validationSchema,
    onSubmit: async (values: UpdatePasswordFormValues, actions: FormikHelpers<UpdatePasswordFormValues>) => {
      console.log('Update Password Request: ', JSON.stringify(values, null, 2))
      setStatus(null);
      try {
        let response = await dispatch(updatePassword(values)).unwrap()
        
        if(response.status === 200) {
          setStatus({message: "Password updated successfully",type: "success"});
          actions.resetForm();
        } else if(response.status === 400) {
          setStatus({message: response.data.message + ": " + response.data.details, type: 'error'});
        } else {
          setStatus({message: JSON.stringify(response.data, null, 2), type: 'error'});
        }
      } catch (err: any) {
        console.error('Update Password Failed: ', err)
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
        <Typography variant="h5" component="h5" sx={{my:2, textAlign:'center'}}> Update Password </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{xs:12, sm:10, md: 6, lg:4}} offset={{xs:0, sm:1, md:3, lg:4}}>
             <FormControl variant="outlined" fullWidth >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"                 
                /> 
                <FormHelperText 
                  error={formik.touched.password && Boolean(formik.errors.password)} 
                  id="password-helper-text">
                    {formik.touched.password && formik.errors.password}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={{xs:12, sm:10, md: 6, lg:4}} offset={{xs:0, sm:1, md:3, lg:4}}>
              <FormControl variant="outlined" fullWidth >
                <InputLabel htmlFor="newPassword">New Password</InputLabel>
                <OutlinedInput
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showNewPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="New Password"                 
                /> 
                <FormHelperText 
                  error={formik.touched.newPassword && Boolean(formik.errors.newPassword)} 
                  id="new-password-helper-text">
                    {formik.touched.newPassword && formik.errors.newPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={{xs:12, sm:10, md: 6, lg:4}} offset={{xs:0, sm:1, md:3, lg:4}}>
              <FormControl variant="outlined" fullWidth >
                <InputLabel htmlFor="verifyNewPassword">Verify New Password</InputLabel>
                <OutlinedInput
                  id="verifyNewPassword"
                  name="verifyNewPassword"
                  type={showVerifyNewPassword ? 'text' : 'password'}
                  value={formik.values.verifyNewPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.verifyNewPassword && Boolean(formik.errors.verifyNewPassword)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showVerifyNewPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowVerifyNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showVerifyNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Verify New Password"                 
                /> 
                <FormHelperText 
                  error={formik.touched.verifyNewPassword && Boolean(formik.errors.verifyNewPassword)} 
                  id="verify-new-password-helper-text">
                    {formik.touched.verifyNewPassword && formik.errors.verifyNewPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={{xs:12, sm:10, md: 6, lg:4}} offset={{xs:0, sm:1, md:3, lg:4}}>
              <Button size='large' 
                color="secondary" 
                variant="contained" 
                fullWidth 
                type="submit"
                loading={Boolean(formik.isSubmitting)} loadingPosition="start">
                Update Password
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};