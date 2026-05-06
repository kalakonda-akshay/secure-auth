import { Link } from "react-router-dom";

const AuthCard = ({ eyebrow, title, subtitle, footerText, footerLink, footerLabel, children }) => (
  <section className="mx-auto grid min-h-[calc(100vh-10rem)] w-full max-w-6xl items-center gap-8 py-8 lg:grid-cols-[0.9fr_1.1fr]">
    <div className="hidden lg:block">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal-200">{eyebrow}</p>
      <h1 className="mt-5 max-w-xl text-5xl font-black leading-tight text-white">
        Recruiter-ready auth with clean security defaults.
      </h1>
      <p className="mt-5 max-w-lg text-lg leading-8 text-slate-300">
        JWT cookies, refresh sessions, role checks, validation, and premium UI patterns in one
        beginner-friendly full-stack project.
      </p>
      <div className="mt-8 grid max-w-lg grid-cols-2 gap-4">
        {["HTTP-only cookies", "RBAC routes", "MongoDB Atlas", "Deploy-ready"].map((item) => (
          <div key={item} className="glass-light rounded-2xl p-4 text-sm font-bold text-white">
            {item}
          </div>
        ))}
      </div>
    </div>

    <div className="glass rounded-3xl p-6 sm:p-8">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-200">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">{subtitle}</p>
      </div>
      {children}
      <p className="mt-8 text-center text-sm text-slate-300">
        {footerText}{" "}
        <Link className="font-bold text-teal-200 hover:text-teal-100" to={footerLink}>
          {footerLabel}
        </Link>
      </p>
    </div>
  </section>
);

export default AuthCard;
