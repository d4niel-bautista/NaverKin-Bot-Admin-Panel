import { useEffect, useRef, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Button, MenuItem, Select } from '@mui/material';

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Layout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [toolbarLabel, setToolbarLabel] = useState("");
  const [token, setToken, serverAPI, updateServerAPI] = useOutletContext();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changeServer = (e) => {
    const { value } = e.target;
    updateServerAPI(value);
  };

  const drawerItems = useRef([
    {
      text: "Accounts",
      icon: <GroupIcon />,
      path: '/accounts',
    }, {
      text: "Add Naver Account",
      icon: <PersonAddIcon />,
      path: '/add_account',
    }, {
      text: "Configurations",
      icon: <SettingsIcon />,
      path: '/configurations',
    }, {
      text: "Increase Level",
      icon: <KeyboardDoubleArrowUpIcon />,
      path: '/increase_level',
    }, {
      text: "Question Answer Form",
      icon: <DescriptionIcon />,
      path: '/question_answer_form',
    }, {
      text: "Activity Log",
      icon: <ListAltIcon />,
      path: '/activity_log',
    },
  ]);

  let location = useLocation();
  useEffect(() => {
    const result = drawerItems.current.find(item => item.path === location.pathname)
    if (result) {
      setToolbarLabel(result.text);
    } else {
      setToolbarLabel("Admin Panel");
    }
  }, [location]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {toolbarLabel}
          </Typography>
          <Select
            id="region"
            name='region'
            variant="standard"
            disableUnderline
            sx={{
              '.MuiSvgIcon-root ': {
                fill: "white!important",
              },
              color: "white",
              marginLeft: 'auto',
              fontSize: '0.7em',
            }}
            value={serverAPI}
            onChange={changeServer}
          >
            <MenuItem value="https://zcl3zvycrkljovbv6loavyj23a0tuiyd.lambda-url.ap-southeast-1.on.aws/v1/api" sx={{ fontSize: '0.7em' }}>SG</MenuItem>
            <MenuItem value="https://ddpsdj2zcpdri67gzviit3ve2i0ozuns.lambda-url.ap-northeast-2.on.aws/v1/api" sx={{ fontSize: '0.7em' }}>KR</MenuItem>
          </Select>
          <Button
            color="inherit"
            aria-label="logout"
            edge="end"
            sx={{
              marginLeft: 1,
            }}
            onClick={() => setToken(null)}
          >
            <Typography variant="caption" noWrap component="div"
              sx={{ paddingRight: '10px' }}
            >
              LOGOUT
            </Typography>
            <LogoutIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant='h6' marginRight={2}>
            지식인 자동 답변
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerItems.current.map((item) => {
            const { text, icon, path } = item;
            return (
              <ListItem key={text} disablePadding>
                <ListItemButton component={Link} to={path}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet context={[token, setToken, serverAPI, updateServerAPI]} />
      </Box>
    </Box >
  );
}

export default Layout;