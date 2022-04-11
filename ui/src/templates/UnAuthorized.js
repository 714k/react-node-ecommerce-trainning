import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { AppBar, DrawerNavigation } from '../components';
import { Home, NotFound } from '../pages';
import * as routes from '../routing/routes';

function UnAuthorized() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar />
      <DrawerNavigation />
      <Route path={routes.home} exact component={Home} />
      <Route component={NotFound} />
    </Box>
  );
}

export default UnAuthorized;
