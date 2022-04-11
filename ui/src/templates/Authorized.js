import React from 'react';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { Login, SignUp } from '../pages';
import * as routes from '../routing/routes';

function Authorized() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Route path={routes.logIn} exact component={Login} />
      <Route path={routes.signUp} exact component={SignUp} />
    </Box>
  );
}

export default Authorized;
