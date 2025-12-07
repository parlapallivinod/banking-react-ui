import { Outlet } from "react-router";
import PublicMenu from "./PublicMenu";



export default function PublicLayout() {
  

  return (
    <>
    <PublicMenu />
      
    <Outlet />
    </>
  );
}
