import Page from "../components/Page.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(date));

const Dashboard = () => {
  const { user } = useAuth();

  const details = [
    { label: "Email", value: user.email },
    { label: "Role", value: user.role },
    { label: "Account created", value: formatDate(user.createdAt) },
    { label: "User ID", value: user.id }
  ];

  return (
    <Page>
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="glass rounded-3xl p-7">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="h-24 w-24 rounded-3xl border border-white/20 bg-white/10"
          />
          <h1 className="mt-6 text-4xl font-black text-white">Hi, {user.name}</h1>
          <p className="mt-3 leading-7 text-slate-300">
            Your session is active and protected by HTTP-only JWT cookies. Refresh the browser and
            the app will restore your login automatically.
          </p>
          <span className="mt-6 inline-flex rounded-full bg-teal-300/15 px-4 py-2 text-sm font-black uppercase text-teal-200">
            {user.role}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {details.map((item) => (
            <div key={item.label} className="glass rounded-3xl p-6">
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-slate-400">
                {item.label}
              </p>
              <p className="mt-4 break-words text-xl font-black text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
};

export default Dashboard;
