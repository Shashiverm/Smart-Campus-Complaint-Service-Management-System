"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ComplaintForm from "../../components/ComplaintForm";
import ComplaintTable from "../../components/ComplaintTable";
import AnalyticsChart from "../../components/AnalyticsChart";
import api from "../../lib/api";
import { getSocket } from "../../lib/socket";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [staffUsers, setStaffUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const role = useMemo(() => user?.role, [user]);

  const loadComplaints = async (currentRole) => {
    const endpoint = currentRole === "student" ? "/complaints/my" : "/complaints";
    const { data } = await api.get(endpoint);
    setComplaints(data.complaints || []);
  };

  const loadUsers = async () => {
    const { data } = await api.get("/users?role=staff");
    setStaffUsers(data.users || []);
  };

  const loadAnalytics = async () => {
    const { data } = await api.get("/complaints/analytics");
    setAnalytics(data);
  };

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) {
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(raw);
    setUser(parsed);

    loadComplaints(parsed.role).catch(() => {});
    if (parsed.role === "admin") {
      loadUsers().catch(() => {});
      loadAnalytics().catch(() => {});
    }

    const socket = getSocket();
    socket.connect();
    socket.emit("join:user", parsed.id);
    socket.emit("join:role", parsed.role);
    socket.on("complaint:update", () => loadComplaints(parsed.role));
    socket.on("complaint:new", () => loadComplaints(parsed.role));

    return () => {
      socket.off("complaint:update");
      socket.off("complaint:new");
      socket.disconnect();
    };
  }, [router]);

  const handleCreateComplaint = async (payload) => {
    await api.post("/complaints", payload);
    if (role) await loadComplaints(role);
  };

  const handleAssign = async (complaintId, staffId) => {
    if (!staffId) return;
    await api.patch(`/complaints/${complaintId}/assign`, { staffId });
    if (role) await loadComplaints(role);
  };

  const handleStatusChange = async (complaintId, status) => {
    if (!status) return;
    await api.patch(`/complaints/${complaintId}/status`, { status });
    if (role) await loadComplaints(role);
    if (role === "admin") await loadAnalytics();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <main className="min-h-screen p-4 md:p-8 space-y-6">
      <section className="card p-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Smart Campus Dashboard</h1>
          <p className="text-slate-600">Logged in as {user?.name || "..."}</p>
        </div>
        <button className="bg-ember text-white px-4 py-2 rounded-xl" onClick={logout}>
          Logout
        </button>
      </section>

      {role === "student" && <ComplaintForm onSubmit={handleCreateComplaint} />}

      <ComplaintTable
        complaints={complaints}
        onAssign={handleAssign}
        onStatusChange={handleStatusChange}
        users={staffUsers}
        role={role}
      />

      {role === "admin" && analytics && <AnalyticsChart analytics={analytics} />}
    </main>
  );
}
