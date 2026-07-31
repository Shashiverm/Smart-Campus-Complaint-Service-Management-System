import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Smart Campus Complaint System",
  description: "Terms and conditions of use for the Smart Campus Complaint & Service Management Platform."
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-dark-navy text-slate-200 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-mint hover:text-mint/80 transition-colors mb-6 font-semibold"
          >
            ← Back to Smart Campus Home
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal/20 border border-teal/40 rounded-full text-mint text-xs font-semibold uppercase tracking-wider mb-3">
            Legal & Institutional Governance
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Terms of Service
          </h1>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Effective Date: July 31, 2026 | Last Updated: July 2026
          </p>
        </div>

        <div className="card p-6 sm:p-10 space-y-8 border-slate-700/60 bg-slate-900/80 backdrop-blur-xl">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-mint">1.</span> Acceptance of Terms
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              By logging into and accessing the Smart Campus Complaint Service Management Platform ("the System"), all authorized campus members—including students, faculty, staff, department heads (HODs), directors, and administrators—agree to be bound by these Terms of Service and all applicable institutional regulations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-mint">2.</span> Account Authorization & Role Access
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Accounts are provisioned solely by authorized campus administrators. Users must log in using their verified institutional email address or registration/staff ID. Users are strictly prohibited from sharing credentials or attempting to bypass role-based access control (RBAC) boundaries.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-mint">3.</span> Acceptable Use & Complaint Submission Rules
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              The System is designated exclusively for reporting genuine campus infrastructure defects, academic facility requirements, IT network issues, sanitation requests, and administrative service feedback.
            </p>
            <ul className="list-disc list-inside text-slate-300 text-sm space-y-1.5 pl-2">
              <li>Submitting fraudulent, malicious, or harassment tickets is strictly prohibited.</li>
              <li>Attaching inappropriate or harmful files is forbidden and monitored.</li>
              <li>False emergency flags will trigger administrative disciplinary review.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-mint">4.</span> Service Level Agreements (SLAs) & Department Routing
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              While the System automatically routes tickets to appropriate department personnel according to defined priority matrices, target resolution times (SLAs) are estimations based on department availability and issue complexity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-mint">5.</span> Modifications & Governing Law
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              The campus administration reserves the right to update these terms at any time. Continued use of the System constitutes acceptance of updated terms.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-700/50 flex flex-wrap justify-between items-center text-xs text-slate-400 gap-4">
            <p>© 2026 Smart Campus Management System. All Rights Reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-mint transition-colors">Privacy Policy</Link>
              <Link href="/compliance" className="hover:text-mint transition-colors">Compliance Statement</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
