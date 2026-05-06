import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const navLinkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-bold transition ${
    isActive ? "bg-white/[0.14] text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"
  }`;

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-teal-300 via-sky-300 to-pink-300 text-lg font-black text-slate-950">
            S
          </span>
          <span className="text-lg font-black text-white">SecureAuth</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          )}
          {isAuthenticated && (
            <NavLink to="/settings" className={navLinkClass}>
              Settings
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="hidden items-center gap-3 sm:flex">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-10 w-10 rounded-full border border-white/20 bg-white/10"
                />
                <div className="leading-tight">
                  <p className="text-sm font-bold text-white">{user.name}</p>
                  <p className="text-xs uppercase text-teal-200">{user.role}</p>
                </div>
              </div>
              <button onClick={handleLogout} className="btn-secondary px-4 py-2 text-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary px-4 py-2 text-sm">
                Login
              </Link>
              <Link to="/register" className="btn-primary px-4 py-2 text-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
