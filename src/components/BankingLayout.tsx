import { Outlet } from "react-router";
import Container from '@mui/material/Container';

export default function BaningLayout() {
  console.log("BankingLayout rendered");
  return (
    <Container maxWidth={false}>
      <h1 style={{position: "sticky",top: "0px", left: "0px"}}>Banking Layout</h1>
      <Outlet />
      <footer>
        <p>&copy; Banking UI</p>
      </footer>
    </Container>
  );
}
