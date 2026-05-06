import { useState } from "react";

const FormInput = ({ label, error, type = "text", className = "", ...props }) => {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-semibold text-slate-200">{label}</span>
      <div className="relative">
        <input className="input pr-16" type={isPassword && visible ? "text" : type} {...props} />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-xs font-bold text-teal-200 transition hover:bg-white/10"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {error && <span className="mt-2 block text-sm text-rose-300">{error}</span>}
    </label>
  );
};

export default FormInput;
