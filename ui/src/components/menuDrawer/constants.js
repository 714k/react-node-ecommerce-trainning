import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';

const menuItems = {
  DASHBOARD: {
    text: 'Dashboard',
    link: '/dashboard',
    icon: <DashboardIcon />,
  },
  LOGOUT: {
    text: 'Logout',
    link: '/login',
    icon: <LogoutIcon />,
  },
};

export { menuItems };
