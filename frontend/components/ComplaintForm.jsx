"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const complaintSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(2),
  location: z.string().min(2),
  department: z.string().min(2),
  priority: z.enum(["low", "medium", "high", "critical"])
});

export default function ComplaintForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(complaintSchema),
    defaultValues: { priority: "medium" }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-6 grid gap-3">
      <h3 className="font-semibold text-lg">Register New Complaint</h3>
      <input className="border rounded-xl px-3 py-2" placeholder="Title" {...register("title")} />
      {errors.title && <p className="text-ember text-sm">Title is required</p>}

      <textarea className="border rounded-xl px-3 py-2" placeholder="Description" {...register("description")} />
      <input className="border rounded-xl px-3 py-2" placeholder="Category" {...register("category")} />
      <input className="border rounded-xl px-3 py-2" placeholder="Location" {...register("location")} />
      <input className="border rounded-xl px-3 py-2" placeholder="Department" {...register("department")} />

      <select className="border rounded-xl px-3 py-2" {...register("priority")}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>

      <button
        type="submit"
        className="bg-teal text-white rounded-xl px-4 py-2 hover:opacity-90 transition"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Complaint"}
      </button>
    </form>
  );
}
