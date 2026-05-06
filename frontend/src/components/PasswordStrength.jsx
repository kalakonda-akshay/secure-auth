const rules = [
  { label: "8+ characters", test: (value) => value.length >= 8 },
  { label: "Uppercase", test: (value) => /[A-Z]/.test(value) },
  { label: "Lowercase", test: (value) => /[a-z]/.test(value) },
  { label: "Number", test: (value) => /\d/.test(value) },
  { label: "Symbol", test: (value) => /[^A-Za-z0-9]/.test(value) }
];

const PasswordStrength = ({ password }) => {
  const passed = rules.filter((rule) => rule.test(password)).length;
  const percentage = (passed / rules.length) * 100;
  const color = passed < 3 ? "bg-rose-400" : passed < 5 ? "bg-amber-300" : "bg-teal-300";

  return (
    <div className="mt-3">
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full ${color} transition-all`} style={{ width: `${percentage}%` }} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {rules.map((rule) => {
          const active = rule.test(password);
          return (
            <span
              key={rule.label}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                active ? "bg-teal-300/15 text-teal-200" : "bg-white/[0.08] text-slate-400"
              }`}
            >
              {rule.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordStrength;
