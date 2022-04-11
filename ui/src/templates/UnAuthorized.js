import React from 'react';
import { Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { AppBar, DrawerNavigation } from '../components';
import { Home } from '../pages';
import * as routes from '../routing/routes';

const Content = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(8, 4),
}));

function UnAuthorized() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar open={open} openDrawer={handleDrawerOpen} />
      <DrawerNavigation open={open} onClose={handleDrawerClose} />
      <Content className="content" theme={theme}>
        <Route path={routes.home} exact component={Home} />
      </Content>
    </Box>
  );
}

export default UnAuthorized;
