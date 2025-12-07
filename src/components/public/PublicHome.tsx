import { Outlet } from "react-router";

import Container from '@mui/material/Container';

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

export default function PublicHome() {
  return (
    <div>
      <Container sx={{color:'grey', pt:4, pb:4,}}>
        <Typography variant="h3" component="h3" sx={{mb:2,}}> Welcome to Banking UI </Typography>

        <Typography variant="h5" component="h5" sx={{mb:2,}}>
          Banking UI is used to simulate financial banking systems present in our society.
        </Typography>

        <Typography variant="h5">
          Users can browse account details, update their passwords and delete their accounts. 
          Users can browse transactions history and perform transactions of type deposit, withdraw and transfer on their accounts.
        </Typography>
     </Container>
    </div>
  );
}
