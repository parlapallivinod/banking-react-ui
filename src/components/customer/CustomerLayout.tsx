import { Outlet } from "react-router";
import CustomerMenu from "./CustomerMenu";

export default function CustomerLayout() {
  return (
    <>
    <CustomerMenu />
    
    <Outlet />
    </>
  );
}
