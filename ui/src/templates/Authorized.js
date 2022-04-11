import React from 'react';
import { Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, useTheme } from '@mui/material/styles';

import { Login, SignUp } from '../pages';
import * as routes from '../routing/routes';

const Content = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  // backgroundColor: '#192428',
  color: '#cef2ff',
  padding: theme.spacing(8, 4),
}));

function Authorized() {
  const theme = useTheme();

  return (
    <Content className="content" theme={theme}>
      <CssBaseline />
      <Route path={routes.logIn} exact component={Login} />
      <Route path={routes.signUp} exact component={SignUp} />
    </Content>
  );
}

export default Authorized;
