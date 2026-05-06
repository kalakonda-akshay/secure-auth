import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Page from "../components/Page.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const stats = [
  { label: "JWT access expiry", value: "15m" },
  { label: "Refresh session", value: "7d" },
  { label: "Roles", value: "2" },
  { label: "Deploy targets", value: "3" }
];

const Home = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Page className="pb-16">
      <section className="grid min-h-[calc(100vh-9rem)] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-black uppercase tracking-[0.22em] text-teal-200"
          >
            MERN Authentication
          </motion.p>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            Secure login that feels polished from the first click.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A complete internship-level authentication app with registration, login, logout,
            protected routes, session persistence, refresh tokens, and admin-only access.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="btn-primary px-6 py-3 text-sm"
            >
              {isAuthenticated ? "Open Dashboard" : "Create Account"}
            </Link>
            <Link to={isAdmin ? "/admin" : "/login"} className="btn-secondary px-6 py-3 text-sm">
              {isAdmin ? "Admin Panel" : "Sign In"}
            </Link>
          </div>
        </div>

        <div className="glass rounded-3xl p-5 sm:p-7">
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-bold text-teal-200">Security Overview</p>
                <p className="mt-1 text-xs text-slate-400">Production authentication flow</p>
              </div>
              <span className="rounded-full bg-teal-300/15 px-3 py-1 text-xs font-black text-teal-200">
                Active
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white/[0.07] p-4">
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                  <p className="mt-2 text-xs font-semibold text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-3">
              {[
                "HTTP-only cookie authentication",
                "Role-based frontend and backend guards",
                "Password strength validation",
                "MongoDB Atlas persistence"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/[0.07] p-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-teal-300" />
                  <span className="text-sm font-semibold text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default Home;
