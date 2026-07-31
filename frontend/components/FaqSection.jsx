"use client";

import { useState } from "react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "How do students, faculty, and staff submit a complaint?",
      a: "Log in through the single campus login portal using your institutional ID or college email. Navigate to the submission form, pick your department/category (Hostel, Academic, IT, Maintenance, Sanitation), select priority level, and submit. An automated tracking ID will be generated immediately."
    },
    {
      q: "What are the typical response and resolution timelines?",
      a: "Critical or emergency issues (such as power outages or water leaks) are assigned with top priority and responded to within 1 to 2 hours. General service requests are usually addressed within 24 to 48 hours."
    },
    {
      q: "How does role-based routing work?",
      a: "Complaints are automatically routed to the responsible department head (HOD), maintenance staff, or campus administrators based on category tags. Each level has tailored oversight and escalation permissions."
    },
    {
      q: "Is student and staff data protected and compliant?",
      a: "Absolutely. All logs and ticket communications are encrypted with AES-256 and TLS 1.3 standards. Our infrastructure complies with FERPA student privacy regulations and institutional security guidelines."
    },
    {
      q: "Can I track the real-time status of my complaint?",
      a: "Yes! Every ticket provides a live status indicator (Open, In Progress, Resolved, Closed) along with timestamped staff response logs and assignment details on your personal dashboard."
    }
  ];

  return (
    <section id="faqs" className="py-20 px-4 sm:px-6 border-t border-slate-700/30 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-mint/10 border border-mint/30 rounded-full mb-3">
            <span className="text-xs font-semibold text-mint uppercase tracking-wider">Help & Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Frequently Asked <span className="bg-gradient-to-r from-mint to-teal bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-slate-400 mt-3 text-base sm:text-lg">
            Find quick answers to common questions about ticket routing, privacy, and resolution SLAs.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-card-interactive rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-slate-100 hover:text-mint transition-colors">
                    {faq.q}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-mint font-bold transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 bg-teal/20 border-teal/40" : ""
                    }`}
                  >
                    ↓
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-700/40 animate-fade-in-up">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
