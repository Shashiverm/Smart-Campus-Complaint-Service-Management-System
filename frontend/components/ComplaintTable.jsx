"use client";

import { useState } from "react";

export default function ComplaintTable({ complaints = [], onAssign, onStatusChange, users = [], role }) {
  const [expandedId, setExpandedId] = useState(null);

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: { label: "Open", color: "badge-open", icon: "🔴" },
      in_progress: { label: "In Progress", color: "badge-in-progress", icon: "🟡" },
      resolved: { label: "Resolved", color: "badge-resolved", icon: "🟢" },
      rejected: { label: "Rejected", color: "badge-rejected", icon: "⚫" }
    };
    const config = statusConfig[status] || { label: status, color: "badge-open", icon: "❓" };
    return config;
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      critical: { label: "Critical", color: "priority-critical", icon: "🔴" },
      high: { label: "High", color: "priority-high", icon: "🟠" },
      medium: { label: "Medium", color: "priority-medium", icon: "🟡" },
      low: { label: "Low", color: "priority-low", icon: "🟢" }
    };
    return priorityConfig[priority] || { label: priority, color: "", icon: "❓" };
  };

  if (complaints.length === 0) {
    return (
      <div className="card p-12 text-center">
        <p className="text-4xl mb-4">📭</p>
        <p className="text-slate-400">No complaints yet.</p>
        {role === "student" && <p className="text-slate-500 text-sm mt-2">Submit a new complaint using the form above.</p>}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {complaints.map((item) => {
        const statusBadge = getStatusBadge(item.status);
        const priorityBadge = getPriorityBadge(item.priority);
        const isExpanded = expandedId === item._id;

        return (
          <div key={item._id} className="card overflow-hidden hover:border-mint/60 transition-all">
            {/* Main Row */}
            <div 
              className="p-6 cursor-pointer hover:bg-slate-800/30 transition-colors"
              onClick={() => setExpandedId(isExpanded ? null : item._id)}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Left Section */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div>
                      <h3 className="font-bold text-lg truncate">{item.title}</h3>
                      <p className="text-slate-400 text-sm">ID: {item._id.slice(0, 8)}...</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-700/50 text-slate-300">
                      📍 {item.location}
                    </span>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-700/50 text-slate-300">
                      🏢 {item.department}
                    </span>
                  </div>
                </div>

                {/* Right Section - Badges */}
                <div className="flex flex-wrap gap-2 md:flex-nowrap">
                  <div className={`px-3 py-2 rounded-lg text-sm font-semibold ${statusBadge.color}`}>
                    {statusBadge.icon} {statusBadge.label}
                  </div>
                  <div className={`px-3 py-2 rounded-lg text-sm font-semibold ${priorityBadge.color}`}>
                    {priorityBadge.icon} {priorityBadge.label}
                  </div>
                  <button className="text-2xl hover:scale-125 transition-transform">
                    {isExpanded ? "▼" : "▶"}
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
              <div className="border-t border-slate-700/50 p-6 space-y-4 bg-slate-900/30">
                {/* Description */}
                <div>
                  <p className="text-sm font-semibold text-slate-300 mb-2">Description</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
                </div>

                {/* Assigned To */}
                {item.assignedTo && (
                  <div>
                    <p className="text-sm font-semibold text-slate-300 mb-2">Assigned To</p>
                    <p className="text-slate-300 text-sm">👤 {item.assignedTo.name} ({item.assignedTo.role})</p>
                  </div>
                )}

                {/* Metadata */}
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-slate-800/50 p-3 rounded-lg">
                    <p className="text-slate-400">Created</p>
                    <p className="text-slate-300 font-semibold">{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                  {item.updatedAt && (
                    <div className="bg-slate-800/50 p-3 rounded-lg">
                      <p className="text-slate-400">Last Updated</p>
                      <p className="text-slate-300 font-semibold">{new Date(item.updatedAt).toLocaleDateString()}</p>
                    </div>
                  )}
                  <div className="bg-slate-800/50 p-3 rounded-lg">
                    <p className="text-slate-400">Submitted By</p>
                    <p className="text-slate-300 font-semibold">{item.submittedBy.name}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-700/50">
                  {role === "admin" && (
                    <div>
                      <label className="text-sm font-semibold text-slate-300 block mb-2">Assign To Staff</label>
                      <select
                        className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 text-white rounded-lg focus:bg-slate-700/80 focus:border-mint/50 transition-all"
                        onChange={(e) => onAssign(item._id, e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select staff member...
                        </option>
                        {users.map((user) => (
                          <option key={user._id} value={user._id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {(role === "admin" || role === "staff") && (
                    <div>
                      <label className="text-sm font-semibold text-slate-300 block mb-2">Update Status</label>
                      <select
                        className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 text-white rounded-lg focus:bg-slate-700/80 focus:border-mint/50 transition-all"
                        onChange={(e) => onStatusChange(item._id, e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Change status...
                        </option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
