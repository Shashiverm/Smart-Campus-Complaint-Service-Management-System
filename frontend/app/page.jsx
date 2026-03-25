import Link from "next/link";

export default function HomePage() {
  const roleLogins = [
    { label: "Student Login", role: "student" },
    { label: "Faculty Login", role: "faculty" },
    { label: "Staff Login", role: "staff" },
    { label: "Admin Login", role: "admin" }
  ];

  const features = [
    "Role-based dashboards for Student, Faculty, Staff, and Admin",
    "Real-time complaint tracking from submission to closure",
    "Transparent assignment, response, and resolution workflow",
    "Status visibility, activity history, and accountability for every ticket"
  ];

  const steps = [
    {
      title: "1. Raise Complaint",
      body: "Students, faculty, and staff can submit complaints with category, priority, and details."
    },
    {
      title: "2. Assign Responsible Team",
      body: "The system routes issues so the responsible person or team can handle them promptly."
    },
    {
      title: "3. Respond & Update",
      body: "Assigned members provide responses, progress notes, and status updates in real time."
    },
    {
      title: "4. Resolve & Close",
      body: "Issues are resolved with clear closure records visible on each user dashboard."
    }
  ];

  return (
    <main className="min-h-screen px-6 py-8 md:px-12 md:py-14">
      <section className="max-w-6xl mx-auto card p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.2em] text-sm text-slate-600 font-semibold">Smart Campus Platform</p>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight text-slate-900">
              Beautifully Managed Campus Complaints, from Request to Resolution
            </h1>
            <p className="mt-4 text-slate-700 text-lg">
              A unified complaint and service management portal where students, faculty, and staff raise issues,
              responsible teams respond, and administrators monitor full resolution progress.
            </p>
            <p className="mt-4 text-sm text-slate-600 bg-white/70 border border-slate-200 rounded-lg p-3">
              Registration is controlled by Admin only. Students, faculty, and staff receive accounts from Admin and
              can then login to their own dashboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {roleLogins.map((item) => (
                <Link
                  key={item.role}
                  href={`/login?role=${item.role}`}
                  className="rounded-xl px-4 py-2.5 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 md:p-7 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How It Works</h2>
            <div className="mt-4 grid gap-3">
              {steps.map((step) => (
                <article key={step.title} className="rounded-xl border border-slate-200 bg-white p-4">
                  <h3 className="font-semibold text-slate-900">{step.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-10 md:mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Core Features</h2>
          <div className="mt-5 grid md:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div key={feature} className="rounded-xl border border-slate-200 bg-white/75 p-4 text-slate-700">
                {feature}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 md:mt-12 rounded-2xl border border-slate-200 bg-slate-900 text-white p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold">Complaint Responsibility & Resolution</h2>
          <p className="mt-3 text-slate-200 max-w-3xl">
            Students, faculty, and staff can raise complaints anytime. The responsible person reviews each complaint,
            responds with updates, and marks it resolved after completion. Everyone can track progress from their
            dashboard with clear status visibility.
          </p>
        </section>
      </section>

      <footer className="max-w-6xl mx-auto mt-8 md:mt-10 card p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-slate-700 font-medium">Role Login Shortcuts</p>
          <div className="flex flex-wrap gap-2">
            {roleLogins.map((item) => (
              <Link
                key={`footer-${item.role}`}
                href={`/login?role=${item.role}`}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 hover:bg-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
