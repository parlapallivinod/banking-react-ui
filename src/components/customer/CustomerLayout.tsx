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
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import WalletIcon from '@mui/icons-material/Wallet';
import PasswordIcon from '@mui/icons-material/Password';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';
import AddCardIcon from '@mui/icons-material/AddCard';
import { useNavigate } from "react-router";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Badge from '@mui/material/Badge';

export default function CustomerLayout() {
  let navigate = useNavigate();
  
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElAccountNav, setAnchorElAccountNav] = React.useState<null | HTMLElement>(null);
  const [anchorElTransactionNav, setAnchorElTransactionNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAccountNav(event.currentTarget);
  };

  const handleOpenTransactionMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTransactionNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseAccountMenu = () => {
    setAnchorElAccountNav(null);
    setAnchorElNav(null);
  };

  const handleCloseTransactionMenu = () => {
    setAnchorElTransactionNav(null);
    setAnchorElNav(null);
  };

  function navigateToHome()  {
    navigate("./")
  }

  function navigateToUpdatePassword()  {
    navigate("./updatePassword")
  }

  function navigateToDeleteAccount()  {
    navigate("./deleteAccount")
  }

  function navigateToNewTransaction()  {
    navigate("./newTransaction")
  }

  function navigateToTransactionHistory()  {
    navigate("./transactionHistory")
  }

  function navigateToLogout()  {
    navigate("../login")
  }


  const menu = [
      <MenuItem key="Account" onClick={handleOpenAccountMenu} 
        aria-label="account menu"
        aria-controls="menu-account"
        aria-haspopup="true"
        color="inherit">
        <AccountBoxIcon/> &nbsp; 
        Account
        <ArrowDropDownIcon />
      </MenuItem>,
      <MenuItem key="Transaction" onClick={handleOpenTransactionMenu} 
        aria-label="transaction menu"
        aria-controls="menu-transaction"
        aria-haspopup="true"
        color="inherit">
        <TransferWithinAStationIcon /> &nbsp;  
        Transaction
        <ArrowDropDownIcon />
      </MenuItem>,
      <MenuItem key="Log Out" onClick={() => {handleCloseNavMenu(); navigateToLogout();}}>
        <LogoutIcon /> &nbsp; 
        Log Out
      </MenuItem>,
  ];

  const accountMenu = (
    <>
    <Menu
      id="menu-account"
      anchorEl={anchorElAccountNav}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorElAccountNav)}
      onClose={handleCloseAccountMenu}
      sx={{ display: { xs: 'block'} }}
    >
      <MenuItem key="Balance" onClick={() => {handleCloseAccountMenu(); navigateToHome();}}>
        <WalletIcon/> &nbsp; 
        Balance
      </MenuItem>
      <MenuItem key="UpdatePassword" onClick={() => {handleCloseAccountMenu(); navigateToUpdatePassword();}}>
        <PasswordIcon /> &nbsp;  
        Update Password
      </MenuItem>
      <MenuItem key="Delete Account" onClick={() => {handleCloseAccountMenu(); navigateToDeleteAccount();}}>
        <DeleteIcon /> &nbsp; 
        Delete Account
      </MenuItem>
    </Menu>
    </>
  );

  const transactionMenu = (
    <>
    <Menu
      id="menu-transaction"
      anchorEl={anchorElTransactionNav}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorElTransactionNav)}
      onClose={handleCloseTransactionMenu}
      sx={{ display: { xs: 'block'} }}
    >
      <MenuItem key="NewTransaction" onClick={() => {handleCloseTransactionMenu(); navigateToNewTransaction();}}>
        <AddCardIcon/> &nbsp; 
        New Transaction
      </MenuItem>
      <MenuItem key="TransactionHistory" onClick={() => {handleCloseTransactionMenu(); navigateToTransactionHistory();}}>
        <HistoryIcon /> &nbsp;  
        Transaction History
      </MenuItem>
    </Menu>
    </>
  );

  return (
    <>
    <AppBar position="sticky">
      <Container maxWidth={false}>
        <Toolbar disableGutters >
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

            <Box sx={{display: { xs: 'none', md: 'flex' }, alignItems: 'center', ml: 'auto', cursor: 'pointer'}} onClick={navigateToHome}>
              <Typography
                noWrap
                component="div"
                sx={{
                  
                  color: 'inherit',
                  textDecoration: 'none',
                  mr:1,
                  
                }}
              >
                Vinod Parlapalli
              </Typography>
              <Badge badgeContent={1000} max={1000000000000} color='secondary' showZero>
                  <WalletIcon fontSize="large" />
              </Badge>
            </Box>
          </Box>


          <AccountBalanceIcon fontSize="large" sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, cursor: 'pointer',}} onClick={navigateToHome} />
          <Typography
            variant="h5"
            noWrap
            component="span"
            onClick={navigateToHome}
            sx={{

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

          <Box sx={{display: { xs: 'flex', md: 'none' }, alignItems: 'center', cursor: 'pointer'}} onClick={navigateToHome}>
            <Typography
              noWrap
              component="div"
              sx={{
                
                color: 'inherit',
                textDecoration: 'none',
                mr:1,
                
              }}
            >
              Vinod Parlapalli
            </Typography>
            <Badge badgeContent={1000} max={1000000000000} color="secondary" showZero>
                <WalletIcon fontSize="large" />
            </Badge>
          </Box>

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
    
    {accountMenu}
    {transactionMenu}
    
    <Outlet />
    </>
  );
}
