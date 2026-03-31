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

  const getStatusColor = (status) => {
    switch(status) {
      case "open": return "text-red-400";
      case "in_progress": return "text-yellow-400";
      case "resolved": return "text-green-400";
      case "rejected": return "text-gray-400";
      default: return "text-slate-400";
    }
  };

  const getComplaintStats = () => {
    const stats = {
      total: complaints.length,
      open: complaints.filter(c => c.status === "open").length,
      inProgress: complaints.filter(c => c.status === "in_progress").length,
      resolved: complaints.filter(c => c.status === "resolved").length
    };
    return stats;
  };

  const stats = getComplaintStats();

  return (
    <main className="min-h-screen bg-dark-navy text-white p-4 md:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in-down">
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 bg-teal rounded-full animate-pulse"></span>
            Welcome, {user?.name || "User"}
          </p>
        </div>
        <button 
          onClick={logout}
          className="px-6 py-2 bg-gradient-to-r from-ember to-red-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-ember/50 transform hover:-translate-y-1 transition-all"
        >
          Logout
        </button>
      </div>

      {/* Stats Section */}
      {(role === "admin" || role !== "student") && (
        <div className="grid md:grid-cols-4 gap-4">
          <div className="card p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-l-4 border-teal animate-fade-in-up">
            <p className="text-slate-400 text-sm">Total Complaints</p>
            <p className="text-3xl font-bold mt-2">{stats.total}</p>
          </div>
          <div className="card p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-l-4 border-red-500 animate-fade-in-up" style={{animationDelay: "50ms"}}>
            <p className="text-slate-400 text-sm">Open</p>
            <p className="text-3xl font-bold mt-2 text-red-400">{stats.open}</p>
          </div>
          <div className="card p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-l-4 border-yellow-500 animate-fade-in-up" style={{animationDelay: "100ms"}}>
            <p className="text-slate-400 text-sm">In Progress</p>
            <p className="text-3xl font-bold mt-2 text-yellow-400">{stats.inProgress}</p>
          </div>
          <div className="card p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-l-4 border-green-500 animate-fade-in-up" style={{animationDelay: "150ms"}}>
            <p className="text-slate-400 text-sm">Resolved</p>
            <p className="text-3xl font-bold mt-2 text-green-400">{stats.resolved}</p>
          </div>
        </div>
      )}

      {/* Complaint Form Section */}
      {role === "student" && (
        <div className="animate-fade-in-up">
          <ComplaintForm onSubmit={handleCreateComplaint} />
        </div>
      )}

      {/* Complaints Table Section */}
      <div className="animate-fade-in-up">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            {role === "student" ? "My Complaints" : "All Complaints"}
          </h2>
          <p className="text-slate-400 text-sm mt-1">Manage and track complaint status</p>
        </div>
        <ComplaintTable
          complaints={complaints}
          onAssign={handleAssign}
          onStatusChange={handleStatusChange}
          users={staffUsers}
          role={role}
        />
      </div>

      {/* Analytics Section */}
      {role === "admin" && analytics && (
        <div className="animate-fade-in-up">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Analytics & Insights</h2>
            <p className="text-slate-400 text-sm mt-1">Complaint statistics and departmental trends</p>
          </div>
          <AnalyticsChart analytics={analytics} />
        </div>
      )}
    </main>
  );
}
