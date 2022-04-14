import React from 'react';
import { useHistory } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { logout } from '../../api';
import { removeItem } from '../../persistence/localStorage';

function MenuItem({ text, open, icon, link }) {
  const history = useHistory();

  const handleClick = (item) => (event) => {
    event.preventDefault();

    switch (item) {
      case 'Dashboard':
        return history.push(link);

      case 'Logout':
        logout();
        removeItem('jwt');
        return history.push(link);

      default:
        return;
    }
  };

  return (
    <ListItemButton
      key={text}
      sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
      }}
      onClick={handleClick(text)}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
    </ListItemButton>
  );
}

export default MenuItem;
