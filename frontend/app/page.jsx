"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FaqSection from "../components/FaqSection";
import ComplaintStatusCalculator from "../components/ComplaintStatusCalculator";

export default function HomePage() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Faster, Clearer, Better.";
  const [charIndex, setCharIndex] = useState(0);

  // Typewriter effect logic
  useEffect(() => {
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 90);
      return () => clearTimeout(timeout);
    }
  }, [charIndex]);

  const features = [
    {
      title: "Role-Based Access Control",
      description: "Tailored dashboards and resolution tools for Students, Faculty, Staff, HODs, Directors, and Admins.",
      icon: "🎯",
      badge: "Multi-Role RBAC"
    },
    {
      title: "Real-Time Tracking Engine",
      description: "Monitor complaint status live from submission to final resolution with real-time Socket updates.",
      icon: "⚡",
      badge: "Live Status"
    },
    {
      title: "Transparent Department Workflow",
      description: "Automated routing to assigned officers with clear audit logs, notes, and institutional accountability.",
      icon: "📊",
      badge: "Audit Ready"
    },
    {
      title: "Full Timeline Visibility",
      description: "Complete history of timestamped comments, state changes, and responsible personnel for every ticket.",
      icon: "👁️",
      badge: "Timestamped"
    },
    {
      title: "Encrypted & FERPA Compliant",
      description: "Bank-grade data protection, TLS encryption, and student privacy compliance built natively.",
      icon: "🛡️",
      badge: "FERPA Protected"
    },
    {
      title: "Smart Escalation Alerts",
      description: "Automated alerts for unresolved high-priority complaints to ensure zero SLA breaches.",
      icon: "🔔",
      badge: "Zero Breach SLA"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Raise Issue",
      body: "Students, faculty, or staff select domain category, location, and attach details or urgency level."
    },
    {
      number: "02",
      title: "Automated Routing",
      body: "The intelligent routing engine dispatches the ticket directly to the responsible team & HOD."
    },
    {
      number: "03",
      title: "Live Action & Update",
      body: "Assigned staff post progress updates, real-time status changes, and resolution notes."
    },
    {
      number: "04",
      title: "Verified Closure",
      body: "Ticket closed with full historical visibility and performance telemetry logged automatically."
    }
  ];

  return (
    <main className="min-h-screen bg-dark-navy text-white overflow-hidden relative">
      {/* Dynamic Background Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal/15 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-mint/10 rounded-full blur-[160px]"></div>
      </div>

      {/* Header Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-teal to-mint rounded-xl flex items-center justify-center font-extrabold text-dark-navy shadow-lg shadow-teal/30 group-hover:scale-105 transition-transform">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-mint transition-colors">
                Smart Campus
              </span>
              <span className="text-[10px] uppercase tracking-widest text-mint font-semibold">
                Service Desk Platform
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-mint transition-colors">Features</a>
            <a href="#workflow" className="hover:text-mint transition-colors">How It Works</a>
            <a href="#estimator" className="hover:text-mint transition-colors">Turnaround Estimator</a>
            <a href="#faqs" className="hover:text-mint transition-colors">FAQs</a>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-ring"></span>
              Systems Operational
            </div>
            <Link
              href="/login"
              className="px-5 py-2.5 bg-gradient-to-r from-teal to-mint text-dark-navy font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-teal/40 hover:-translate-y-0.5 transition-all"
            >
              Sign In Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-20 md:pb-28 px-4 sm:px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/15 border border-teal/40 rounded-full shadow-inner">
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse"></span>
                <span className="text-xs sm:text-sm font-semibold text-mint">
                  ✨ Next-Generation Campus Operations Platform
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] text-white tracking-tight">
                Resolve Campus Issues{" "}
                <span className="block text-gradient-shimmer">
                  {typedText}<span className="animate-pulse">|</span>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                A unified service & complaint management ecosystem connecting students, faculty, staff, and leadership. 
                Experience instant issue filing, automated department dispatch, and live status resolution.
              </p>

              {/* Stats Highlights */}
              <div className="grid grid-cols-3 gap-3 pt-2 max-w-xl">
                <div className="glass-card-interactive p-4 text-center rounded-2xl">
                  <p className="text-2xl sm:text-3xl font-extrabold text-mint">24/7</p>
                  <p className="text-xs text-slate-400 font-medium mt-1">Live Desk Active</p>
                </div>
                <div className="glass-card-interactive p-4 text-center rounded-2xl">
                  <p className="text-2xl sm:text-3xl font-extrabold text-mint">&lt;2h</p>
                  <p className="text-xs text-slate-400 font-medium mt-1">Avg Critical Response</p>
                </div>
                <div className="glass-card-interactive p-4 text-center rounded-2xl">
                  <p className="text-2xl sm:text-3xl font-extrabold text-mint">100%</p>
                  <p className="text-xs text-slate-400 font-medium mt-1">Transparent Logs</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/login"
                  className="px-8 py-4 text-center bg-gradient-to-r from-teal via-mint to-teal bg-[length:200%_auto] hover:bg-right text-dark-navy font-extrabold text-base rounded-2xl shadow-xl shadow-teal/30 hover:shadow-teal/50 transform hover:-translate-y-1 transition-all duration-300"
                >
                  Access Single Login Portal →
                </Link>
                <a
                  href="#estimator"
                  className="px-8 py-4 text-center border border-mint/40 text-mint font-bold text-base rounded-2xl hover:bg-mint/10 transition-all backdrop-blur-md"
                >
                  Explore SLA Timelines
                </a>
              </div>
            </div>

            {/* Right Visual: AI Generated Graphic */}
            <div className="lg:col-span-5 relative animate-fade-in-down">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-teal via-mint to-cyan-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative glass-card-interactive p-3 rounded-3xl border-mint/40 overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero_campus_tech.png"
                    alt="Smart Campus Complaint Operations Graphic"
                    width={600}
                    height={450}
                    priority
                    className="rounded-2xl w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="p-4 bg-slate-900/90 backdrop-blur-md rounded-xl mt-3 flex items-center justify-between border border-slate-700/60">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-mint animate-pulse"></div>
                      <div>
                        <p className="text-xs font-bold text-white">Live Central Dispatch</p>
                        <p className="text-[11px] text-slate-400">Automated ticketing & RBAC monitor</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-teal/20 text-mint text-xs font-bold rounded-lg border border-teal/40">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Access Banner Section */}
      <section className="px-4 sm:px-6 pb-12 z-10 relative">
        <div className="max-w-6xl mx-auto glass-card-interactive p-6 sm:p-8 rounded-3xl border-mint/40 bg-gradient-to-r from-slate-900/90 via-teal/15 to-slate-900/90">
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <span className="text-xs uppercase tracking-widest text-mint font-extrabold">Unified Institutional Access</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">One Portal for Every Campus Stakeholder</h3>
              <p className="text-slate-300 text-sm">
                Whether you are a Student raising hostel issues, Faculty requesting lab maintenance, Staff updating ticket status, or HOD/Admin reviewing analytics.
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <Link
                href="/login"
                className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-mint to-teal text-dark-navy font-bold rounded-xl text-center shadow-lg hover:shadow-mint/40 transition-all hover:scale-105"
              >
                Select Role & Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section id="features" className="py-20 px-4 sm:px-6 border-t border-slate-700/30 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal/20 border border-teal/40 rounded-full mb-3">
              <span className="text-xs font-semibold text-mint uppercase tracking-wider">Built For Scalability</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Enterprise Feature Suite
            </h2>
            <p className="text-slate-400 mt-3 text-base sm:text-lg max-w-2xl mx-auto">
              Engineered with advanced role controls, real-time Socket synchronization, and complete audit tracking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="glass-card-interactive p-7 rounded-2xl relative group overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl p-3 bg-slate-800/80 rounded-2xl border border-slate-700 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </span>
                  <span className="text-[11px] font-bold px-3 py-1 bg-mint/10 border border-mint/30 text-mint rounded-full">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="font-extrabold text-xl text-white mb-2 group-hover:text-mint transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* AI Image Feature Showcase Row */}
          <div className="mt-16 grid md:grid-cols-2 gap-8 items-center">
            <div className="glass-card-interactive p-4 rounded-3xl border-slate-700/80 relative overflow-hidden group">
              <Image
                src="/images/analytics_preview.png"
                alt="Campus Analytics Interface Preview"
                width={600}
                height={350}
                className="rounded-2xl w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-4 bg-slate-900/90 rounded-xl mt-3 border border-slate-700/50">
                <h4 className="font-bold text-white text-base">Real-Time Operational Analytics</h4>
                <p className="text-xs text-slate-300 mt-1">Live graphs tracking response times, open tickets by department, and closed resolution metrics.</p>
              </div>
            </div>

            <div className="glass-card-interactive p-4 rounded-3xl border-slate-700/80 relative overflow-hidden group">
              <Image
                src="/images/campus_roles_security.png"
                alt="Multi-Tier Role Access and Security Graphic"
                width={600}
                height={350}
                className="rounded-2xl w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-4 bg-slate-900/90 rounded-xl mt-3 border border-slate-700/50">
                <h4 className="font-bold text-white text-base">Multi-Tier Security & Role Control</h4>
                <p className="text-xs text-slate-300 mt-1">Granular permissions for Students, Faculty, Staff, HODs, Directors, and Administrators.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Workflow Section */}
      <section id="workflow" className="py-20 px-4 sm:px-6 border-t border-slate-700/30 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-mint/10 border border-mint/30 rounded-full mb-3">
              <span className="text-xs font-semibold text-mint uppercase tracking-wider">Simple & Transparent</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Resolution Workflow
            </h2>
            <p className="text-slate-400 mt-3 text-base sm:text-lg">
              Streamlined 4-step ticket routing from creation to verified closure.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="glass-card-interactive p-6 rounded-2xl relative z-10 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal to-mint text-dark-navy font-extrabold text-xl flex items-center justify-center mb-5 shadow-lg shadow-teal/30">
                    {step.number}
                  </div>
                  <h3 className="font-extrabold text-lg text-white mb-2">{step.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{step.body}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-mint font-semibold">
                  <span>Step {idx + 1} of 4</span>
                  <span>✓ Standardized</span>
                </div>
              </div>
            ))}
          </div>

          {/* Workflow AI Image Banner */}
          <div className="mt-12 glass-card-interactive p-4 sm:p-6 rounded-3xl border-teal/40 overflow-hidden">
            <Image
              src="/images/resolution_workflow.png"
              alt="Interactive Campus Resolution Workflow Illustration"
              width={1200}
              height={400}
              className="rounded-2xl w-full h-auto object-cover max-h-[360px]"
            />
          </div>
        </div>
      </section>

      {/* Interactive Estimator Component */}
      <div id="estimator" className="relative z-10">
        <ComplaintStatusCalculator />
      </div>

      {/* FAQ Section */}
      <div className="relative z-10">
        <FaqSection />
      </div>

      {/* Login CTA Section */}
      <section id="login-section" className="py-20 px-4 sm:px-6 border-t border-slate-700/30 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card-interactive p-10 sm:p-14 rounded-3xl border-mint/40 bg-gradient-to-b from-slate-900/90 via-slate-800/80 to-slate-900/90 relative overflow-hidden">
            <div className="text-5xl mb-4 animate-bounce">🔐</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Ready to Sign In to Your Dashboard?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto text-base mb-8">
              Select your campus role on the single login page and enter your college email or registration/staff ID to begin.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-teal via-mint to-teal bg-[length:200%_auto] text-dark-navy font-extrabold text-base rounded-2xl shadow-xl shadow-teal/40 hover:scale-105 transition-all"
            >
              Go to Campus Login Portal →
            </Link>
          </div>
        </div>
      </section>

      {/* Comprehensive Footer with Legal & Compliance Links */}
      <footer className="border-t border-slate-800 bg-slate-950/90 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-teal to-mint rounded-xl flex items-center justify-center font-extrabold text-dark-navy">
                S
              </div>
              <span className="font-extrabold text-xl text-white">Smart Campus</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Enterprise smart campus complaint resolution and service management platform providing transparent, FERPA-compliant issue handling.
            </p>
            <p className="text-xs text-mint font-mono">
              Status: All Systems Operational (v1.0.0)
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li><a href="#features" className="hover:text-mint transition-colors">Platform Features</a></li>
              <li><a href="#workflow" className="hover:text-mint transition-colors">Resolution Workflow</a></li>
              <li><a href="#estimator" className="hover:text-mint transition-colors">SLA Estimator</a></li>
              <li><a href="#faqs" className="hover:text-mint transition-colors">Frequently Asked Questions</a></li>
              <li><Link href="/login" className="hover:text-mint transition-colors">Single Sign-On Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Legal & Compliance</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li><Link href="/terms" className="hover:text-mint transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-mint transition-colors">Privacy Policy</Link></li>
              <li><Link href="/compliance" className="hover:text-mint transition-colors">FERPA & Accessibility Statement</Link></li>
              <li><a href="/sitemap.xml" className="hover:text-mint transition-colors">Dynamic XML Sitemap</a></li>
              <li><a href="/robots.txt" className="hover:text-mint transition-colors">Robots Configuration</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Campus Desk Support</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3">
              For emergency campus facility issues or account provisioning requests, contact your campus department administrator.
            </p>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1 font-mono">
              <p>📍 Central Administration Hub</p>
              <p>✉️ support@smartcampus.edu</p>
              <p>📞 Ext. 4400 / Emergency 911</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-400 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 Smart Campus Complaint & Service Management System. Built with Next.js & TailwindCSS.</p>
            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-mint">Terms</Link>
              <Link href="/privacy" className="hover:text-mint">Privacy</Link>
              <Link href="/compliance" className="hover:text-mint">Compliance</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
