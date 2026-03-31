"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const complaintSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().optional(),
  responsibilityCategory: z.enum(["hod", "director", "technical_staff", "faculty", "staff", "other"]),
  location: z.string().min(2, "Location is required"),
  department: z.string().min(2, "Department is required"),
  priority: z.enum(["low", "medium", "high", "critical"])
});

export default function ComplaintForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(complaintSchema),
    defaultValues: { priority: "medium", responsibilityCategory: "other", category: "" }
  });

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "critical": return "border-red-500 focus:border-red-500";
      case "high": return "border-orange-500 focus:border-orange-500";
      case "medium": return "border-yellow-500 focus:border-yellow-500";
      case "low": return "border-green-500 focus:border-green-500";
      default: return "border-slate-600";
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="card p-8 md:p-10 space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-2xl font-bold mb-2">Register New Complaint</h2>
        <p className="text-slate-400 text-sm">Fill out the form below to submit a new complaint</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-semibold text-slate-300">
            Complaint Title <span className="text-red-400">*</span>
          </label>
          <input 
            className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg focus:bg-slate-700/50 focus:border-mint/50 focus:ring-2 focus:ring-mint/20 transition-all" 
            placeholder="Brief title of the complaint"
            {...register("title")} 
          />
          {errors.title && <p className="text-red-400 text-xs">⚠️ {errors.title.message}</p>}
        </div>

        {/* Description */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-semibold text-slate-300">
            Detailed Description <span className="text-red-400">*</span>
          </label>
          <textarea 
            className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg focus:bg-slate-700/50 focus:border-mint/50 focus:ring-2 focus:ring-mint/20 transition-all resize-none h-32"
            placeholder="Provide detailed information about the complaint"
            {...register("description")} 
          />
          {errors.description && <p className="text-red-400 text-xs">⚠️ {errors.description.message}</p>}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">
            Category
          </label>
          <input 
            className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg focus:bg-slate-700/50 focus:border-mint/50 focus:ring-2 focus:ring-mint/20 transition-all"
            placeholder="e.g., Infrastructure, Cleanliness (optional)"
            {...register("category")} 
          />
          {errors.category && <p className="text-red-400 text-xs">⚠️ {errors.category.message}</p>}
        </div>

        {/* Responsibility Category */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">
            Route To <span className="text-red-400">*</span>
          </label>
          <select
            className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg focus:bg-slate-700/50 focus:border-mint/50 focus:ring-2 focus:ring-mint/20 transition-all"
            {...register("responsibilityCategory")}
          >
            <option value="hod">HOD</option>
            <option value="director">Director</option>
            <option value="technical_staff">Technical Staff</option>
            <option value="faculty">Faculty</option>
            <option value="staff">Staff</option>
            <option value="other">Not Sure</option>
          </select>
          {errors.responsibilityCategory && <p className="text-red-400 text-xs">⚠️ {errors.responsibilityCategory.message}</p>}
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">
            Location <span className="text-red-400">*</span>
          </label>
          <input 
            className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg focus:bg-slate-700/50 focus:border-mint/50 focus:ring-2 focus:ring-mint/20 transition-all"
            placeholder="Building/Room number"
            {...register("location")} 
          />
          {errors.location && <p className="text-red-400 text-xs">⚠️ {errors.location.message}</p>}
        </div>

        {/* Department */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">
            Department <span className="text-red-400">*</span>
          </label>
          <input 
            className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg focus:bg-slate-700/50 focus:border-mint/50 focus:ring-2 focus:ring-mint/20 transition-all"
            placeholder="Relevant department"
            {...register("department")} 
          />
          {errors.department && <p className="text-red-400 text-xs">⚠️ {errors.department.message}</p>}
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">
            Priority Level <span className="text-red-400">*</span>
          </label>
          <select 
            className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 text-white rounded-lg focus:bg-slate-700/50 focus:border-mint/50 focus:ring-2 focus:ring-mint/20 transition-all"
            {...register("priority")}
          >
            <option value="low">🟢 Low Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="high">🟠 High Priority</option>
            <option value="critical">🔴 Critical Priority</option>
          </select>
          {errors.priority && <p className="text-red-400 text-xs">⚠️ {errors.priority.message}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-teal to-mint text-dark-navy font-bold rounded-lg hover:shadow-lg hover:shadow-teal/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1 active:translate-y-0"
      >
        {isSubmitting ? "Submitting..." : "Submit Complaint"}
      </button>
    </form>
  );
}
