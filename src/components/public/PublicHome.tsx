import { Outlet } from "react-router";
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function PublicHome() {
  return (
    <div>
      <h1>Pubic Home</h1>
      <Link href="/login">
      <MapsHomeWorkIcon style={{ fontSize: 100, color: 'SILVER' }} />
      </Link>

      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Item>size=8</Item>
        </Grid>
        <Grid size={4}>
          <Item>size=4</Item>
        </Grid>
        <Grid size={4}>
          <Item>size=4</Item>
        </Grid>
        <Grid size={8}>
          <Item>size=8</Item>
        </Grid>
      </Grid>
    </Box>
     
    </div>
  );
}
