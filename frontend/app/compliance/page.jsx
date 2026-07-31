import Link from "next/link";

export const metadata = {
  title: "Institutional Compliance & Accessibility | Smart Campus",
  description: "FERPA compliance, WCAG 2.1 AA accessibility guidelines, security auditing, and institutional governance."
};

export default function CompliancePage() {
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
            Standards & Governance
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Institutional Compliance & Accessibility
          </h1>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Detailed overview of our FERPA compliance, accessibility commitments, and auditing standards.
          </p>
        </div>

        <div className="card p-6 sm:p-10 space-y-8 border-slate-700/60 bg-slate-900/80 backdrop-blur-xl">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-mint">1.</span> FERPA & Student Data Protection
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              The Smart Campus Platform adheres strictly to the Family Educational Rights and Privacy Act (FERPA). Student identifying details in complaint records are restricted solely to authorized department personnel responsible for resolving the designated ticket.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-mint">2.</span> WCAG 2.1 AA Accessibility Standards
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              We are committed to ensuring digital accessibility for people with disabilities. The user interface is built to conform with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA specifications:
            </p>
            <ul className="list-disc list-inside text-slate-300 text-sm space-y-1.5 pl-2">
              <li>High-contrast color palettes adhering to minimum 4.5:1 ratio for text legibility.</li>
              <li>Keyboard-navigable interface controls and visible focus indicators.</li>
              <li>ARIA labels and semantic HTML tags for screen reader compatibility.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-mint">3.</span> Audit Logs & System Accountability
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              To maintain institutional transparency, every ticket status update, escalation, comment, and administrative override creates an immutable system log entry for quality assurance and administrative review.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-mint">4.</span> Compliance Contact & Support
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              For compliance inquiries, accessibility concerns, or data requests, please contact your campus IT & Institutional Compliance Officer at <span className="text-mint font-mono">compliance@smartcampus.edu</span>.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-700/50 flex flex-wrap justify-between items-center text-xs text-slate-400 gap-4">
            <p>© 2026 Smart Campus Management System.</p>
            <div className="flex gap-4">
              <Link href="/terms" className="hover:text-mint transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-mint transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
