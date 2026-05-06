import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios.js";
import Page from "../components/Page.jsx";
import SkeletonCard from "../components/SkeletonCard.jsx";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/admin/users");
        setUsers(data.users);
        setAnalytics(data.analytics);
      } catch (error) {
        toast.error(error.response?.data?.message || "Unable to load admin data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const cards = [
    { label: "Total users", value: analytics?.totalUsers ?? 0 },
    { label: "Admins", value: analytics?.admins ?? 0 },
    { label: "Standard users", value: analytics?.standardUsers ?? 0 }
  ];

  return (
    <Page>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-teal-200">Admin</p>
        <h1 className="mt-3 text-4xl font-black text-white">User Control Center</h1>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-3">
            {cards.map((card) => (
              <div key={card.label} className="glass rounded-3xl p-6">
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-slate-400">
                  {card.label}
                </p>
                <p className="mt-4 text-4xl font-black text-white">{card.value}</p>
              </div>
            ))}
          </section>

          <section className="glass mt-6 overflow-hidden rounded-3xl">
            <div className="border-b border-white/10 px-5 py-4">
              <h2 className="text-lg font-black text-white">Registered Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-white/[0.07] text-xs uppercase tracking-[0.15em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">User</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Role</th>
                    <th className="px-5 py-4">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {users.map((user) => (
                    <tr key={user._id} className="text-slate-200">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className="h-10 w-10 rounded-full bg-white/10"
                          />
                          <span className="font-bold">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">{user.email}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-teal-300/15 px-3 py-1 text-xs font-black uppercase text-teal-200">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
                          new Date(user.createdAt)
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </Page>
  );
};

export default AdminPanel;
