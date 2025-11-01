import { Outlet } from "react-router";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useNavigate } from "react-router";



export default function PublicLayout() {
  let navigate = useNavigate();
  
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function navigateToHome()  {
    navigate("./")
  }

  function navigateToLogin()  {
    navigate("./login")
  }

  function navigateToRegister()  {
    navigate("./register")
  }

  const menu = [
      <MenuItem key="Home" onClick={() => {handleCloseNavMenu(); navigateToHome();}}>
        <HomeIcon/> &nbsp; 
        Home
      </MenuItem>,
      <MenuItem key="Login" onClick={() => {handleCloseNavMenu(); navigateToLogin();}}>
        <LoginIcon /> &nbsp;  
        Login
      </MenuItem>,
      <MenuItem key="Register" onClick={() => {handleCloseNavMenu(); navigateToRegister();}}>
        <AppRegistrationIcon /> &nbsp; 
        Register
      </MenuItem>,
  ];


  return (
    <>
    <AppBar position="sticky">
      <Container maxWidth={false} >
        <Toolbar disableGutters>
          <AccountBalanceIcon fontSize="large" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, cursor: 'pointer',}} onClick={navigateToHome} />
          <Typography
            variant="h5"
            noWrap
            component="span"
            sx={{
              mr: 5,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onClick={navigateToHome}
          >
            Banking UI
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {menu}
          </Box>

          <AccountBalanceIcon fontSize="large" sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, cursor: 'pointer',}} onClick={navigateToHome} />
          <Typography
            variant="h5"
            noWrap
            component="span"
            onClick={navigateToHome}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}

          >
            Banking UI
          </Typography>

          <Box sx={{ flexGrow: 1, justifyContent: "flex-end", display: { xs: 'flex', md: 'none' }}}>
            <IconButton
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon fontSize="large"/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {menu}
            </Menu>
          </Box>      
        </Toolbar>
      </Container>
    </AppBar>
      
    <Outlet />
    </>
  );
}
