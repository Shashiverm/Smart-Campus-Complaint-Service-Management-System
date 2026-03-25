"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import api from "../../../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const role = searchParams.get("role");
  const roleTitleMap = {
    student: "Student Login",
    faculty: "Faculty Login",
    staff: "Staff Login",
    admin: "Admin Login"
  };
  const loginTitle = roleTitleMap[role] || "Campus Login";

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form className="card p-8 w-full max-w-md grid gap-3" onSubmit={handleLogin}>
        <h2 className="text-2xl font-semibold">{loginTitle}</h2>
        <p className="text-sm text-slate-600">
          Accounts are created by Admin only. If you do not have credentials, contact your campus administrator.
        </p>
        <input
          type="email"
          placeholder="College email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-xl px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-xl px-3 py-2"
          required
        />
        {error && <p className="text-ember text-sm">{error}</p>}
        <button type="submit" className="bg-teal text-white rounded-xl px-4 py-2">
          Login
        </button>
      </form>
    </main>
  );
}
