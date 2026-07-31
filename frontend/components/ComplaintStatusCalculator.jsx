"use client";

import { useState } from "react";

export default function ComplaintStatusCalculator() {
  const [category, setCategory] = useState("hostel");
  const [priority, setPriority] = useState("medium");

  const categoryDetails = {
    hostel: {
      name: "Hostel & Housing",
      icon: "🏨",
      dept: "Hostel Warden & Maintenance",
      avgTime: "4 to 12 Hours",
      escalation: "Superintendent Escalation after 24h",
      example: "Water leakage, room furniture damage, keycard/lock issue"
    },
    academic: {
      name: "Academic & Labs",
      icon: "📚",
      dept: "Department HOD & IT Support",
      avgTime: "2 to 8 Hours",
      escalation: "Dean of Academics Escalation",
      example: "Projector malfunction, lab computer error, seating defect"
    },
    it: {
      name: "IT & Wi-Fi Network",
      icon: "📶",
      dept: "Campus IT Infrastructure Team",
      avgTime: "1 to 4 Hours",
      escalation: "Network Director Escalation",
      example: "Wi-Fi outage, portal login error, server downtime"
    },
    sanitation: {
      name: "Sanitation & Hygiene",
      icon: "🧹",
      dept: "Estate & Sanitation Supervisor",
      avgTime: "2 to 6 Hours",
      escalation: "Estate Officer Escalation",
      example: "Washroom cleaning, waste bin overflow, pest control"
    },
    electrical: {
      name: "Electrical & HVAC",
      icon: "⚡",
      dept: "Electrical Engineering Cell",
      avgTime: "1 to 3 Hours",
      escalation: "Chief Engineer Alert",
      example: "Power outage, air conditioner failure, elevator maintenance"
    }
  };

  const priorityMultiplier = {
    critical: "Urgent SLA (1-2 Hours)",
    high: "High Priority SLA (4-8 Hours)",
    medium: "Standard SLA (12-24 Hours)",
    low: "Normal SLA (24-48 Hours)"
  };

  const currentCat = categoryDetails[category];

  return (
    <section className="py-16 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto glass-card-interactive p-6 sm:p-10 rounded-3xl border-mint/30 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-slate-700/50 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal/20 border border-teal/40 rounded-full text-mint text-xs font-semibold uppercase tracking-wider mb-2">
              ⚡ Live Service Estimator
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Instant Issue Turnaround Estimator
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mt-1">
              Select an issue domain and urgency to preview target department routing and SLA timelines.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Controls */}
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                1. Select Issue Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.keys(categoryDetails).map((key) => (
                  <button
                    key={key}
                    onClick={() => setCategory(key)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2 text-xs font-bold transition-all ${
                      category === key
                        ? "bg-gradient-to-r from-teal to-mint text-dark-navy border-mint shadow-lg shadow-teal/30 scale-105"
                        : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-700/50"
                    }`}
                  >
                    <span className="text-lg">{categoryDetails[key].icon}</span>
                    <span className="truncate">{categoryDetails[key].name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                2. Urgency Priority Level
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["critical", "high", "medium", "low"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`p-2.5 rounded-xl border text-center text-xs font-semibold uppercase tracking-wide transition-all ${
                      priority === p
                        ? p === "critical"
                          ? "bg-red-500/20 border-red-500 text-red-300 font-bold"
                          : p === "high"
                          ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                          : p === "medium"
                          ? "bg-teal/30 border-teal text-mint font-bold"
                          : "bg-slate-700/40 border-slate-600 text-slate-300"
                        : "bg-slate-800/40 border-slate-700/40 text-slate-400 hover:text-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Visual Box */}
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/70 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-mint/20 border-b border-l border-mint/40 text-mint text-[11px] font-mono font-bold rounded-bl-xl">
              AUTOMATED ROUTING
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal/20 border border-teal/40 flex items-center justify-center text-2xl">
                {currentCat.icon}
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">{currentCat.name}</h4>
                <p className="text-xs text-mint font-medium">{currentCat.dept}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/50">
                <p className="text-[11px] text-slate-400 font-medium">Estimated SLA</p>
                <p className="text-sm font-bold text-mint mt-0.5">{currentCat.avgTime}</p>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/50">
                <p className="text-[11px] text-slate-400 font-medium">Priority SLA target</p>
                <p className="text-sm font-bold text-slate-200 mt-0.5">{priorityMultiplier[priority]}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700/50 space-y-1 text-xs">
              <p className="text-slate-400"><span className="text-slate-200 font-semibold">Common Examples:</span> {currentCat.example}</p>
              <p className="text-slate-400"><span className="text-slate-200 font-semibold">Escalation Policy:</span> {currentCat.escalation}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
