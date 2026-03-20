"use client";

export default function ComplaintTable({ complaints = [], onAssign, onStatusChange, users = [], role }) {
  return (
    <div className="overflow-x-auto card p-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-slate-200">
            <th className="py-2">Title</th>
            <th className="py-2">Department</th>
            <th className="py-2">Status</th>
            <th className="py-2">Priority</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((item) => (
            <tr key={item._id} className="border-b border-slate-100">
              <td className="py-2">{item.title}</td>
              <td className="py-2">{item.department}</td>
              <td className="py-2 capitalize">{item.status.replace("_", " ")}</td>
              <td className="py-2 capitalize">{item.priority}</td>
              <td className="py-2 flex flex-wrap gap-2">
                {role === "admin" && (
                  <select
                    className="border rounded-lg px-2 py-1"
                    onChange={(e) => onAssign(item._id, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Assign staff
                    </option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                )}

                {(role === "admin" || role === "staff") && (
                  <select
                    className="border rounded-lg px-2 py-1"
                    onChange={(e) => onStatusChange(item._id, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Update status
                    </option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
