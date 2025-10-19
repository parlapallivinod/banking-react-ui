import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <div>
      <h1>Pubic Layout</h1>
      <nav>
        <a href="/">Public Home</a> |{" "}
        <a href="/login">Login</a> |{" "}
        <a href="/register">Register</a> |{" "}
      </nav>
      <Outlet />
    </div>
  );
}
