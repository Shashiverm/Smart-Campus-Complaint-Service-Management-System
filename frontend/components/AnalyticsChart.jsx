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
    labels: ["Open", "In Progress", "Resolved", "Rejected"],
    datasets: [
      {
        label: "Complaints",
        data: [
          analytics?.summary?.open || 0,
          analytics?.summary?.inProgress || 0,
          analytics?.summary?.resolved || 0,
          analytics?.summary?.rejected || 0
        ],
        backgroundColor: ["#D94E41", "#F59E0B", "#0A7075", "#64748B"]
      }
    ]
  };

  const barData = {
    labels: (analytics?.byDepartment || []).map((item) => item._id),
    datasets: [
      {
        label: "Complaints by Department",
        data: (analytics?.byDepartment || []).map((item) => item.value),
        backgroundColor: "#6BA3BE"
      }
    ]
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card p-4">
        <Doughnut data={pieData} />
      </div>
      <div className="card p-4">
        <Bar data={barData} />
      </div>
    </div>
  );
}
