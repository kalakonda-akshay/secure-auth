import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const AppLayout = () => (
  <div className="app-shell">
    <Navbar />
    <Outlet />
  </div>
);

export default AppLayout;
