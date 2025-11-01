import { Outlet } from "react-router";

export default function BaningLayout() {
  console.log("BankingLayout rendered");
  return (
    <>
      <Outlet />
      <footer>
        <p>&copy; Banking UI</p>
      </footer>
    </>
  )
  
}
