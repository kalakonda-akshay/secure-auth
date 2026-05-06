import Page from "../components/Page.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Settings = () => {
  const { user } = useAuth();

  return (
    <Page>
      <section className="mx-auto max-w-3xl">
        <div className="glass rounded-3xl p-7">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-teal-200">Account</p>
          <h1 className="mt-3 text-4xl font-black text-white">Profile Settings</h1>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-24 w-24 rounded-3xl border border-white/20 bg-white/10"
            />
            <div>
              <p className="text-2xl font-black text-white">{user.name}</p>
              <p className="mt-1 text-slate-300">{user.email}</p>
              <p className="mt-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase text-teal-200">
                {user.role}
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.07] p-5 text-sm leading-7 text-slate-300">
            This project keeps account editing read-only to stay focused on authentication basics.
            The structure is ready for profile update endpoints, avatar uploads, and password
            change flows when you want to extend it.
          </div>
        </div>
      </section>
    </Page>
  );
};

export default Settings;
