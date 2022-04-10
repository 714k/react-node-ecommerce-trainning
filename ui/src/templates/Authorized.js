import React from 'react';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { AppBar, DrawerNavigation } from '../components';
import { Home } from '../pages';

function Authorized() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar />
      <DrawerNavigation />
      <Route path="/app/home" exact component={Home} />
      {/* <Route path="/app/dashboard" exact component={Dashboard} /> */}
      <Redirect from="/app" to="/app/home" exact />
    </Box>
  );
}

export default Authorized;
