"use client";

import { useState } from "react";

const initialForm = {
  collegeId: "",
  name: "",
  email: "",
  personalEmail: "",
  phone: "",
  password: "",
  role: "student",
  department: "",
  branch: "",
  className: "",
  rollNumber: "",
  registrationNumber: "",
  batch: "",
  facultyId: "",
  roleInDepartment: "",
  staffId: ""
};

export default function UserManagementPanel({ users = [], onCreateUser }) {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const payload = Object.fromEntries(
        Object.entries(formData).filter(([, value]) => value !== "")
      );

      await onCreateUser(payload);
      setFormData(initialForm);
    } catch (requestError) {
      const errors = requestError.response?.data?.errors;
      if (Array.isArray(errors) && errors.length > 0) {
        const message = errors
          .map((item) => item.msg)
          .filter(Boolean)
          .join(", ");
        setError(message || requestError.response?.data?.message || "Failed to create user");
      } else {
        setError(requestError.response?.data?.message || "Failed to create user");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="card p-6 md:p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">User Management</h2>
        <p className="text-slate-400 text-sm mt-1">Create and manage Student, Faculty, Staff, HOD, Director, and Admin accounts.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
        <input
          name="collegeId"
          value={formData.collegeId}
          onChange={handleChange}
          placeholder="College ID"
          className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg"
          required
        />
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full name"
          className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg"
          required
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
          className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg"
          required
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg"
          required
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Temporary password"
          className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg"
          required
          minLength={8}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg"
          required
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="staff">Staff</option>
          <option value="hod">HOD</option>
          <option value="director">Director</option>
          <option value="admin">Admin</option>
        </select>
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg"
          required
        />

        {(formData.role === "student") && (
          <>
            <input
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              placeholder="Branch"
              className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg"
              required
            />
            <input
              name="className"
              value={formData.className}
              onChange={handleChange}
              placeholder="Class"
              className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg"
              required
            />
            <input
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              placeholder="Roll Number"
              className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg"
              required
            />
            <input
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              placeholder="Registration Number"
              className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg"
              required
            />
            <input
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              placeholder="Batch"
              className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg"
              required
            />
          </>
        )}

        {(formData.role === "faculty" || formData.role === "hod" || formData.role === "director") && (
          <>
            <input
              name="personalEmail"
              type="email"
              value={formData.personalEmail}
              onChange={handleChange}
              placeholder="Personal Email"
              className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg"
              required={formData.role === "faculty"}
            />
            <input
              name="facultyId"
              value={formData.facultyId}
              onChange={handleChange}
              placeholder="Faculty ID"
              className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg"
              required
            />
          </>
        )}

        {(formData.role === "staff") && (
          <>
            <input
              name="roleInDepartment"
              value={formData.roleInDepartment}
              onChange={handleChange}
              placeholder="Role in Department"
              className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg"
              required
            />
            <input
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              placeholder="Staff ID"
              className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg"
              required
            />
          </>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="md:col-span-3 px-6 py-3 bg-gradient-to-r from-teal to-mint text-dark-navy font-bold rounded-lg disabled:opacity-50"
        >
          {isSubmitting ? "Creating user..." : "Create User"}
        </button>
      </form>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-slate-400 border-b border-slate-700/60">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Role</th>
              <th className="py-2 pr-4">Department</th>
              <th className="py-2 pr-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-slate-700/30 text-slate-200">
                <td className="py-2 pr-4">{user.name}</td>
                <td className="py-2 pr-4 capitalize">{user.role}</td>
                <td className="py-2 pr-4">{user.department || "-"}</td>
                <td className="py-2 pr-4">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
