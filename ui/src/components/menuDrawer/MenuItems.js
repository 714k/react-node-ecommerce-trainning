import React from 'react';
import List from '@mui/material/List';

import { menuItems } from './constants';
import MenuItem from './MenuItem';

function MenuItems({ open }) {
  return (
    <List>
      {Object.values(menuItems).map(({ icon, link, text }) => {
        return (
          <MenuItem
            key={text}
            icon={icon}
            link={link}
            text={text}
            open={open}
          />
        );
      })}
    </List>
  );
}

export default MenuItems;
