import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { Login, SignUp } from '../pages';

function UnAuthorized() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Route path="/auth/login" exact component={Login} />
      <Route path="/auth/signup" exact component={SignUp} />
      {/* <Redirect from="/auth" to="/auth/login" exact /> */}
    </Box>
  );
}

export default UnAuthorized;
