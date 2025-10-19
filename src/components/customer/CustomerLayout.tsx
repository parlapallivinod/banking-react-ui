import { Outlet } from "react-router";

export default function CustomerLayout() {
  return (
    <div>
      <h1>Customer Layout</h1>
      <nav>
        <a href="/customer">Customer Home</a> |{" "}
        <a href="/customer/transfer">Transfer</a> |{" "}
        <a href="/customer/history">History</a>
      </nav>
      <Outlet />
    </div>
  );
}
