"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ComplaintForm from "../../components/ComplaintForm";
import ComplaintTable from "../../components/ComplaintTable";
import AnalyticsChart from "../../components/AnalyticsChart";
import UserManagementPanel from "../../components/UserManagementPanel";
import api from "../../lib/api";
import { getSocket } from "../../lib/socket";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [assignableUsers, setAssignableUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [activityByComplaint, setActivityByComplaint] = useState({});

  const role = useMemo(() => user?.role, [user]);
  const elevatedRoles = useMemo(() => ["admin", "hod", "director"], []);

  const loadComplaints = async (currentRole) => {
    const endpoint = currentRole === "student" ? "/complaints/my" : "/complaints";
    const { data } = await api.get(endpoint);
    setComplaints(data.complaints || []);
  };

  const loadUsers = async () => {
    const { data } = await api.get("/users");
    const users = data.users || [];
    setAllUsers(users);
    setAssignableUsers(users.filter((currentUser) => ["staff", "faculty"].includes(currentUser.role)));
  };

  const loadAnalytics = async () => {
    const { data } = await api.get("/complaints/analytics");
    setAnalytics(data);
  };

  const loadComplaintActivity = async (complaintId) => {
    const { data } = await api.get(`/complaints/${complaintId}/activity`);
    setActivityByComplaint((previous) => ({
      ...previous,
      [complaintId]: data.activity || []
    }));
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
    if (elevatedRoles.includes(parsed.role)) {
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
  }, [router, elevatedRoles]);

  const handleCreateComplaint = async (payload) => {
    await api.post("/complaints", payload);
    if (role) await loadComplaints(role);
  };

  const handleCreateUser = async (payload) => {
    await api.post("/auth/register", payload);
    await loadUsers();
  };

  const handleAssign = async (complaintId, staffId) => {
    if (!staffId) return;
    await api.patch(`/complaints/${complaintId}/assign`, { assigneeId: staffId });
    if (role) await loadComplaints(role);
    await loadComplaintActivity(complaintId);
  };

  const handleStatusChange = async (complaintId, status) => {
    if (!status) return;
    await api.patch(`/complaints/${complaintId}/status`, { status });
    if (role) await loadComplaints(role);
    if (role && elevatedRoles.includes(role)) await loadAnalytics();
    await loadComplaintActivity(complaintId);
  };

  const handleCategoryChange = async (complaintId, payload) => {
    await api.patch(`/complaints/${complaintId}/category`, payload);
    if (role) await loadComplaints(role);
    await loadComplaintActivity(complaintId);
  };

  const handleDownloadReport = async () => {
    const response = await api.get("/complaints/report/download", { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `complaints-report-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
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
      pendingConfirmation: complaints.filter(c => c.status === "pending_confirmation").length,
      resolved: complaints.filter(c => c.status === "resolved").length,
      rejected: complaints.filter(c => c.status === "rejected").length
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
      {(elevatedRoles.includes(role) || role === "staff" || role === "faculty") && (
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">
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
          <div className="card p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-l-4 border-orange-400 animate-fade-in-up" style={{animationDelay: "125ms"}}>
            <p className="text-slate-400 text-sm">Pending Confirmation</p>
            <p className="text-3xl font-bold mt-2 text-orange-300">{stats.pendingConfirmation}</p>
          </div>
          <div className="card p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-l-4 border-green-500 animate-fade-in-up" style={{animationDelay: "150ms"}}>
            <p className="text-slate-400 text-sm">Resolved</p>
            <p className="text-3xl font-bold mt-2 text-green-400">{stats.resolved}</p>
          </div>
          <div className="card p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-l-4 border-slate-500 animate-fade-in-up" style={{animationDelay: "175ms"}}>
            <p className="text-slate-400 text-sm">Rejected</p>
            <p className="text-3xl font-bold mt-2 text-slate-300">{stats.rejected}</p>
          </div>
        </div>
      )}

      {/* Complaint Form Section */}
      {["student", "faculty", "staff"].includes(role) && (
        <div className="animate-fade-in-up">
          <ComplaintForm onSubmit={handleCreateComplaint} />
        </div>
      )}

      {/* Admin User Management */}
      {elevatedRoles.includes(role) && (
        <div className="animate-fade-in-up">
          <div className="mb-4 flex justify-end">
            <button
              onClick={handleDownloadReport}
              className="px-5 py-2 bg-gradient-to-r from-mint to-teal text-dark-navy font-semibold rounded-lg"
            >
              Download Report (CSV)
            </button>
          </div>
          <UserManagementPanel users={allUsers} onCreateUser={handleCreateUser} />
        </div>
      )}

      {/* Complaints Table Section */}
      <div className="animate-fade-in-up">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            {role === "student" ? "My Complaints" : elevatedRoles.includes(role) ? "All Complaints" : "Assigned Complaints"}
          </h2>
          <p className="text-slate-400 text-sm mt-1">Manage and track complaint status</p>
        </div>
        <ComplaintTable
          complaints={complaints}
          onAssign={handleAssign}
          onStatusChange={handleStatusChange}
          onCategoryChange={handleCategoryChange}
          onLoadActivity={loadComplaintActivity}
          activityByComplaint={activityByComplaint}
          users={assignableUsers}
          role={role}
        />
      </div>

      {/* Analytics Section */}
      {elevatedRoles.includes(role) && analytics && (
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
