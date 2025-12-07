import { useFormik, type FormikHelpers } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
import { register } from '../../reducers/publicSlice';
import { useAppDispatch } from '../../app/hooks';
import type { RequestStatus } from '../../app/withTypes';
import RequestStatusComponent from '../RequestStatusComponent';

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username should be of minimum 5 characters length')
    .max(16, 'Username should be of maximum 16 characters length'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password should be of minimum 5 characters length')
    .max(16, 'Password should be of maximum 16 characters length'),
  verifyPassword: yup
    .string()
    .required('Verify Password is required')
    .min(5, 'Verify Password should be of minimum 5 characters length')
    .max(16, 'Verify Password should be of maximum 16 characters length')
});

export interface RegisterFormValues {
  username: string,
  password: string,
  verifyPassword: string
}

const validate = (values: RegisterFormValues) => {
   const errors = {};

   if(values.password !== values.verifyPassword)
      errors.verifyPassword= 'Password, Verify Password does not match'
   return errors;

 };


export default function Register() {
  const initialRegisterFormValues: RegisterFormValues = {username: '', password: '' , verifyPassword: ''};
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [status, setStatus] = useState<RequestStatus | null>(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowVerifyPassword = () => setShowVerifyPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: initialRegisterFormValues,
    validate,
    validationSchema: validationSchema,
    onSubmit: async (values: RegisterFormValues, actions: FormikHelpers<RegisterFormValues>) => {
      console.log('Register Request: ', JSON.stringify(values, null, 2))
      setStatus(null);
      try {
        let response = await dispatch(register(values)).unwrap()
        
        if(response.status === 201) {
          setStatus({message: "Registration completed successfully. Please login into your account to perform transactions.",
            type: "success"
          });
          actions.resetForm();
        } else if(response.status === 400) {
          setStatus({message: response.data.message + ": " + response.data.details, type: 'error'});
        } else {
          setStatus({message: JSON.stringify(response.data, null, 2), type: 'error'});
        }
      } catch (err: any) {
        console.error('Register Failed: ', err)
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
        <Typography variant="h5" component="h5" sx={{my:2, textAlign:'center'}}> Register </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{xs:12, sm:10, md: 6, lg:4}} offset={{xs:0, sm:1, md:3, lg:4}}>
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
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
                <InputLabel htmlFor="verifyPassword">Verify Password</InputLabel>
                <OutlinedInput
                  id="verifyPassword"
                  name="verifyPassword"
                  type={showVerifyPassword ? 'text' : 'password'}
                  value={formik.values.verifyPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.verifyPassword && Boolean(formik.errors.verifyPassword)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showVerifyPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowVerifyPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showVerifyPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Verify Password"                 
                /> 
                <FormHelperText 
                  error={formik.touched.verifyPassword && Boolean(formik.errors.verifyPassword)} 
                  id="verify-password-helper-text">
                    {formik.touched.verifyPassword && formik.errors.verifyPassword}
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
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};