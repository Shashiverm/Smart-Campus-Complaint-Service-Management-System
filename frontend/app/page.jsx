import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen p-6 md:p-12">
      <section className="max-w-4xl mx-auto card p-8 md:p-10">
        <h1 className="text-3xl md:text-5xl font-bold text-ink leading-tight">
          Smart Campus Complaint & Service Management System
        </h1>
        <p className="mt-4 text-slate-700 text-lg">
          A centralized platform for students, staff, and administrators to register complaints, track progress, and
          resolve issues with accountability and real-time visibility.
        </p>
        <div className="mt-8 flex gap-3 flex-wrap">
          <Link href="/login" className="bg-teal text-white px-5 py-3 rounded-xl font-medium">
            Login to Continue
          </Link>
          <Link href="/dashboard" className="bg-sand px-5 py-3 rounded-xl font-medium text-ink">
            Open Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
