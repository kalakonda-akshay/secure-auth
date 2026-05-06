import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthCard from "../components/AuthCard.jsx";
import FormInput from "../components/FormInput.jsx";
import Page from "../components/Page.jsx";
import PasswordStrength from "../components/PasswordStrength.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: true
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = "Name must be at least 2 characters.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email.";
    if (form.password.length < 8) nextErrors.password = "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(form.password) || !/\d/.test(form.password) || !/[^A-Za-z0-9]/.test(form.password)) {
      nextErrors.password = "Use uppercase, number, and special character.";
    }
    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords must match.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await register(form);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Page>
      <AuthCard
        eyebrow="Start protected"
        title="Create your account"
        subtitle="Strong validation and duplicate-email checks keep the signup flow reliable."
        footerText="Already registered?"
        footerLink="/login"
        footerLabel="Sign in"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormInput
            label="Full Name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={updateField}
            error={errors.name}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={updateField}
            error={errors.email}
          />
          <div>
            <FormInput
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={updateField}
              error={errors.password}
            />
            <PasswordStrength password={form.password} />
          </div>
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={updateField}
            error={errors.confirmPassword}
          />
          <label className="flex items-center gap-3 text-sm font-semibold text-slate-300">
            <input
              type="checkbox"
              name="rememberMe"
              checked={form.rememberMe}
              onChange={updateField}
              className="h-4 w-4 rounded border-white/20 accent-teal-300"
            />
            Keep me signed in
          </label>
          <button disabled={submitting} className="btn-primary w-full px-5 py-3 disabled:opacity-60">
            {submitting ? "Creating account..." : "Create Account"}
          </button>
        </form>
      </AuthCard>
    </Page>
  );
};

export default Register;
