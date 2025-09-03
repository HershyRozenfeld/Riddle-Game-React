import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <Navbar />
      <main style={{ maxWidth: 900, margin: "24px auto", padding: 16, direction: "rtl" }}>
        <Outlet />
      </main>
    </div>
  );
}