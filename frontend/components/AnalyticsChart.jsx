"use client";

import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  BarElement
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function AnalyticsChart({ analytics }) {
  const pieData = {
    labels: ["Open", "In Progress", "Pending Confirmation", "Resolved", "Rejected"],
    datasets: [
      {
        label: "Complaints",
        data: [
          analytics?.summary?.open || 0,
          analytics?.summary?.inProgress || 0,
          analytics?.summary?.pendingConfirmation || 0,
          analytics?.summary?.resolved || 0,
          analytics?.summary?.rejected || 0
        ],
        backgroundColor: [
          "rgba(239, 68, 68, 0.7)",    // Red for Open
          "rgba(245, 158, 11, 0.7)",   // Orange for In Progress
          "rgba(251, 146, 60, 0.7)",   // Amber for Pending Confirmation
          "rgba(16, 185, 129, 0.7)",   // Green for Resolved
          "rgba(100, 116, 139, 0.7)"   // Gray for Rejected
        ],
        borderColor: [
          "rgba(239, 68, 68, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(251, 146, 60, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(100, 116, 139, 1)"
        ],
        borderWidth: 2
      }
    ]
  };

  const barData = {
    labels: (analytics?.byDepartment || []).map((item) => item._id),
    datasets: [
      {
        label: "Complaints",
        data: (analytics?.byDepartment || []).map((item) => item.value),
        backgroundColor: "rgba(10, 112, 117, 0.7)",
        borderColor: "rgba(107, 163, 190, 1)",
        borderWidth: 2,
        borderRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1",
          font: {
            family: "'Poppins', sans-serif",
            size: 12,
            weight: "600"
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: "rgba(30, 41, 59, 0.9)",
        borderColor: "rgba(107, 163, 190, 0.5)",
        borderWidth: 1,
        titleColor: "#f8fafc",
        bodyColor: "#cbd5e1",
        cornerRadius: 8,
        padding: 12,
        titleFont: {
          size: 14,
          weight: "bold"
        },
        bodyFont: {
          size: 13
        }
      }
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up">
      {/* Status Distribution */}
      <div className="card p-8">
        <h3 className="text-lg font-bold mb-6">Status Distribution</h3>
        <div className="relative h-80">
          <Doughnut data={pieData} options={chartOptions} />
        </div>
        <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-slate-300">Open</span>
            </span>
            <span className="font-bold text-red-400">{analytics?.summary?.open || 0}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-slate-300">In Progress</span>
            </span>
            <span className="font-bold text-yellow-400">{analytics?.summary?.inProgress || 0}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              <span className="text-slate-300">Pending Confirmation</span>
            </span>
            <span className="font-bold text-orange-300">{analytics?.summary?.pendingConfirmation || 0}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-slate-300">Resolved</span>
            </span>
            <span className="font-bold text-green-400">{analytics?.summary?.resolved || 0}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-slate-300">Rejected</span>
            </span>
            <span className="font-bold text-gray-400">{analytics?.summary?.rejected || 0}</span>
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="card p-8">
        <h3 className="text-lg font-bold mb-6">Complaints by Department</h3>
        <div className="relative h-80">
          <Bar data={barData} options={chartOptions} />
        </div>
        <div className="mt-6 pt-6 border-t border-slate-700/50">
          <p className="text-xs text-slate-400">
            Total complaints across all departments: <span className="font-bold text-mint">{(analytics?.byDepartment || []).reduce((sum, item) => sum + item.value, 0)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
