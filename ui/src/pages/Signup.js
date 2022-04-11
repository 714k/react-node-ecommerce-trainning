import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled, useTheme } from '@mui/material/styles';

import { API_URL } from '../config';

const Form = styled(FormControl)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: 'white',
  color: 'white',
  padding: theme.spacing(8, 4),

  '.MuiOutlinedInput-root': {
    // color: 'red',
    marginBottom: theme.spacing(2),
  },
}));

function SignUp() {
  const theme = useTheme();

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    weightRange: '',
    showPassword: false,
    error: false,
    success: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <h2>SignUp</h2>
      <Form variant="outlined" theme={theme}>
        <TextField
          id="outlined-first-name"
          label="First Name"
          value={values.firstName}
          onChange={handleChange('firstName')}
          placeholder="Enter your first name"
        />
        <TextField
          id="outlined-last-name"
          label="Last Name"
          value={values.lastName}
          onChange={handleChange('lastName')}
          placeholder="Enter your last name"
        />
        <TextField
          id="outlined-email"
          label="Email"
          value={values.email}
          type="email"
          onChange={handleChange('email')}
          placeholder="Enter an email"
        />
        <TextField
          id="input-with-icon-textfield"
          label="Password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          placeholder="Enter a Password"
        />
        <LoadingButton
          loading={false}
          loadingPosition="end"
          endIcon={<SendIcon />}
          variant="contained"
          size="large"
        >
          Submit
        </LoadingButton>
      </Form>
    </>
  );
}

export default SignUp;
