import React from 'react';
import { Redirect } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled, useTheme } from '@mui/material/styles';

import { login } from '../api';
import { setLocalStorage } from '../persistence/localStorage';

const Form = styled(FormControl)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: 'white',
  color: 'white',
  padding: theme.spacing(8, 4),

  '.MuiTextField-root': {
    marginBottom: theme.spacing(2),
  },
}));

function Login() {
  const theme = useTheme();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
    errors: [],
    loading: false,
    redirect: false,
  });

  const { email, password, showPassword, errors, loading, redirect } = values;

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });

    login({ email, password }).then((response) => {
      if (response.error) {
        return setValues({
          ...values,
          errors: [response.error],
          loading: false,
        });
      }

      if (response.errors) {
        return setValues({
          ...values,
          errors: response.errors,
          loading: false,
        });
      }

      setValues({
        ...values,
        loading: false,
        redirect: true,
      });

      setLocalStorage('jwt', response.data);
    });
  };

  return (
    <>
      <h2>Login</h2>
      {errors.length > 0 &&
        errors.map((error, idx) => {
          return <Alert severity="error">{`${idx}. ${error}`}</Alert>;
        })}

      {redirect && <Redirect to="/home" />}

      <Form variant="outlined" theme={theme}>
        <TextField
          id="outlined-email"
          label="Email"
          value={email}
          type="email"
          onChange={handleChange('email')}
          placeholder="Enter an email"
        />
        <TextField
          id="input-with-icon-textfield"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
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
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          placeholder="Enter a Password"
        />
        <LoadingButton
          loading={loading}
          loadingPosition="end"
          endIcon={<SendIcon />}
          variant="contained"
          size="large"
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </Form>
    </>
  );
}

export default Login;
