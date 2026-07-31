import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Smart Campus Complaint System",
  description: "Data collection, student privacy, encryption standards, and institutional data policies."
};

export default function PrivacyPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-mint/10 border border-mint/30 rounded-full text-mint text-xs font-semibold uppercase tracking-wider mb-3">
            Institutional Data Protection
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Privacy Policy
          </h1>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Effective Date: July 31, 2026 | Compliant with FERPA & Institutional Security Standards
          </p>
        </div>

        <div className="card p-6 sm:p-10 space-y-8 border-slate-700/60 bg-slate-900/80 backdrop-blur-xl">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-mint">1.</span> Information We Collect
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              We process minimal essential user information necessary to provide efficient service management across campus:
            </p>
            <ul className="list-disc list-inside text-slate-300 text-sm space-y-1.5 pl-2">
              <li><strong className="text-white">Account Data:</strong> Full Name, Institutional Email, Registration/Staff ID, Role, Department.</li>
              <li><strong className="text-white">Complaint Content:</strong> Issue Category, Room/Location, Description, Attachments, Status Logs.</li>
              <li><strong className="text-white">System Logs:</strong> IP address, timestamped status updates, and administrative resolution notes.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-mint">2.</span> How Information is Used
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Collected information is strictly utilized to assign, track, resolve, and audit campus complaints. We do not sell, license, or share user data with third-party commercial entities under any circumstances.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-mint">3.</span> FERPA & Student Privacy Compliance
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              In accordance with Family Educational Rights and Privacy Act (FERPA) principles, student complaint histories and personally identifiable educational records are protected against unauthorized access. Access is strictly limited to assigned staff and campus leadership.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-mint">4.</span> Encryption & Security Measures
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              All communications between your browser and our servers are protected using Transport Layer Security (TLS 1.3). Database records are encrypted at rest using AES-256 encryption.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-mint">5.</span> Data Retention & Rights
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Ticket archives are retained in accordance with institutional record-keeping policies. Users may request a transcript of their filed tickets through their department administrator.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-700/50 flex flex-wrap justify-between items-center text-xs text-slate-400 gap-4">
            <p>© 2026 Smart Campus Management System. Institutional Privacy Standard.</p>
            <div className="flex gap-4">
              <Link href="/terms" className="hover:text-mint transition-colors">Terms of Service</Link>
              <Link href="/compliance" className="hover:text-mint transition-colors">Compliance Statement</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
