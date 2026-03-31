"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "../../../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const role = searchParams.get("role");
  const roleTitleMap = {
    student: "Student Login",
    faculty: "Faculty Login",
    staff: "Staff Login",
    admin: "Admin Login"
  };
  const loginTitle = roleTitleMap[role] || "Campus Login";
  
  const roleEmojis = {
    student: "👨‍🎓",
    faculty: "👨‍🏫",
    staff: "👨‍💼",
    admin: "👨‍💻"
  };
  const roleEmoji = roleEmojis[role] || "🔐";

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const payload = { email, password };
      if (role && roleTitleMap[role]) {
        payload.role = role;
      }

      const { data } = await api.post("/auth/login", payload);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-navy text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradient Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-mint/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="min-h-screen flex items-center justify-center w-full animate-fade-in-up">
        <div className="grid md:grid-cols-2 gap-12 w-full max-w-6xl items-center">
          {/* Left Section - Info */}
          <div className="hidden md:block space-y-6 text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-teal/20 border border-teal/40 rounded-full">
              <span className="text-2xl">{roleEmoji}</span>
              <span className="text-sm font-semibold text-mint">{loginTitle}</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-mint to-teal bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-lg text-slate-300">
                Access your Smart Campus dashboard to manage and track complaints efficiently.
              </p>
            </div>

            <div className="space-y-4 pt-6">
              <div className="flex gap-4 text-slate-400">
                <span className="text-2xl">🔐</span>
                <div>
                  <p className="font-semibold text-white">Secure Authentication</p>
                  <p className="text-sm">Your credentials are encrypted and protected</p>
                </div>
              </div>
              <div className="flex gap-4 text-slate-400">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-semibold text-white">Instant Access</p>
                  <p className="text-sm">Login and start managing complaints immediately</p>
                </div>
              </div>
              <div className="flex gap-4 text-slate-400">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="font-semibold text-white">Real-Time Updates</p>
                  <p className="text-sm">See live status and activity on your dashboard</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="w-full">
            <form onSubmit={handleLogin} className="card p-8 md:p-10 space-y-6 relative z-10">
              {/* Mobile Header */}
              <div className="md:hidden text-center mb-6">
                <p className="text-4xl mb-3">{roleEmoji}</p>
                <h2 className="text-3xl font-bold mb-2">{loginTitle}</h2>
                <p className="text-sm text-slate-400">
                  Accounts are created by Admin only
                </p>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Email Address</label>
                <input
                  type="email"
                  placeholder="your.email@campus.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg focus:bg-slate-700/50 focus:border-mint/50 focus:ring-2 focus:ring-mint/20 transition-all"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg focus:bg-slate-700/50 focus:border-mint/50 focus:ring-2 focus:ring-mint/20 transition-all"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-ember/20 border border-ember/40 text-ember rounded-lg flex items-start gap-3">
                  <span className="mt-0.5">⚠️</span>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-teal to-mint text-dark-navy font-bold rounded-lg hover:shadow-lg hover:shadow-teal/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              {/* Additional Info */}
              <div className="pt-4 border-t border-slate-700/50">
                <p className="text-xs text-slate-400 text-center leading-relaxed">
                  If you don't have an account, contact your campus administrator. Accounts are created by Admin only.
                </p>
              </div>

              {/* Back to Home Link */}
              <Link
                href="/"
                className="flex items-center justify-center gap-2 text-sm text-mint hover:text-mint/80 transition-colors pt-2"
              >
                ← Back to Home
              </Link>
            </form>

            {/* Additional Info Card */}
            <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg text-center text-sm text-slate-400">
              <p>🔒 <span className="text-slate-300">Your login information is secure</span></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
