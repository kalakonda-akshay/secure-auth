import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthCard from "../components/AuthCard.jsx";
import FormInput from "../components/FormInput.jsx";
import Page from "../components/Page.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/dashboard";
  const [form, setForm] = useState({ email: "", password: "", rememberMe: true });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email.";
    if (!form.password) nextErrors.password = "Password is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await login(form);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Page>
      <AuthCard
        eyebrow="Welcome back"
        title="Sign in securely"
        subtitle="Use your email and password to continue to your protected dashboard."
        footerText="New here?"
        footerLink="/register"
        footerLabel="Create an account"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={updateField}
            error={errors.email}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={updateField}
            error={errors.password}
          />
          <label className="flex items-center gap-3 text-sm font-semibold text-slate-300">
            <input
              type="checkbox"
              name="rememberMe"
              checked={form.rememberMe}
              onChange={updateField}
              className="h-4 w-4 rounded border-white/20 accent-teal-300"
            />
            Remember me on this device
          </label>
          <button disabled={submitting} className="btn-primary w-full px-5 py-3 disabled:opacity-60">
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </AuthCard>
    </Page>
  );
};

export default Login;
