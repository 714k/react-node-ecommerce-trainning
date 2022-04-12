import React from 'react';
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

import { API_URL } from '../config';

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

function SignUp() {
  const theme = useTheme();

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: undefined,
    showPassword: false,
    errors: [],
    success: false,
  });

  const {
    firstName,
    lastName,
    email,
    password,
    role,
    showPassword,
    errors,
    success,
  } = values;

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

    // setValues({ ...values, errors: false });

    submitForm({ firstName, lastName, email, password, role }).then((data) => {
      if (data.errors) {
        return setValues({
          ...values,
          errors: data.errors,
          success: false,
        });
      }

      if (data.error) {
        return setValues({ ...values, errors: [data.error], success: false });
      }

      setValues({
        ...values,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: undefined,
        showPassword: false,
        errors: [],
        success: true,
      });
    });
  };

  const submitForm = (dataForm) => {
    return fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForm),
    })
      .then((response) => response.json())
      .catch((errors) => {
        setValues({ ...values, errors, success: false });
        console.log({ errors });
      });
  };

  return (
    <>
      <h2>SignUp</h2>
      {errors.length > 0 &&
        errors.map((error, idx) => {
          return <Alert severity="error">{`${idx}. ${error}`}</Alert>;
        })}

      {success && (
        <Alert severity="success">Account created Successfully!</Alert>
      )}
      <Form variant="outlined" theme={theme}>
        <TextField
          id="outlined-first-name"
          label="First Name"
          value={firstName}
          onChange={handleChange('firstName')}
          placeholder="Enter your first name"
        />
        <TextField
          id="outlined-last-name"
          label="Last Name"
          value={lastName}
          onChange={handleChange('lastName')}
          placeholder="Enter your last name"
        />
        <TextField
          id="outlined-email"
          label="Email"
          value={email}
          type="email"
          onChange={handleChange('email')}
          placeholder="Enter an email"
        />
        <TextField
          id="outlined-role"
          label="Role"
          value={role}
          type="text"
          onChange={handleChange('role')}
          placeholder="Enter a role"
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
          loading={false}
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

export default SignUp;
