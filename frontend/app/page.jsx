import Link from "next/link";

export default function HomePage() {
  const roleLogins = [
    { label: "Student Login", role: "student", icon: "👨‍🎓" },
    { label: "Faculty Login", role: "faculty", icon: "👨‍🏫" },
    { label: "Staff Login", role: "staff", icon: "👨‍💼" },
    { label: "HOD Login", role: "hod", icon: "🧑‍🏫" },
    { label: "Director Login", role: "director", icon: "🧑‍💼" },
    { label: "Admin Login", role: "admin", icon: "👨‍💻" }
  ];

  const features = [
    {
      title: "Role-Based Dashboards",
      description: "Customized interfaces for Student, Faculty, Staff, and Admin roles",
      icon: "🎯"
    },
    {
      title: "Real-Time Tracking",
      description: "Monitor complaint status from submission to closure in real-time",
      icon: "⚡"
    },
    {
      title: "Transparent Workflow",
      description: "Clear assignment, response, and resolution process for accountability",
      icon: "📊"
    },
    {
      title: "Full Visibility",
      description: "Activity history and status visibility for every ticket",
      icon: "👁️"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Raise Complaint",
      body: "Students, faculty, and staff submit complaints with category, priority, and details."
    },
    {
      number: "02",
      title: "Assign Responsible Team",
      body: "The system routes issues to the responsible person or team for prompt handling."
    },
    {
      number: "03",
      title: "Respond & Update",
      body: "Assigned members provide real-time responses, progress notes, and status updates."
    },
    {
      number: "04",
      title: "Resolve & Close",
      body: "Issues are resolved with clear closure records visible on each dashboard."
    }
  ];

  return (
    <main className="min-h-screen bg-dark-navy text-white overflow-hidden">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-dark-navy/80 border-b border-slate-700/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal to-mint rounded-lg flex items-center justify-center font-bold text-dark-navy">
              S
            </div>
            <span className="font-bold text-xl">Smart Campus</span>
          </div>
          <p className="text-sm text-slate-400">Complaint Management System</p>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Content */}
            <div className="animate-fade-in-up space-y-6">
              <div className="inline-block px-4 py-2 bg-teal/20 border border-teal/40 rounded-full">
                <span className="text-sm font-semibold text-mint">✨ Next-Gen Campus Platform</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-mint to-teal bg-clip-text text-transparent">
                Streamlined Complaint Management
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                A unified complaint and service management portal where students, faculty, and staff raise issues, 
                responsible teams respond, and administrators monitor full resolution progress in real-time.
              </p>
              <div className="flex gap-4 pt-4">
                <a href="#login-section" className="px-8 py-3 bg-gradient-to-r from-teal to-mint text-dark-navy font-semibold rounded-lg hover:shadow-lg hover:shadow-teal/50 transform hover:-translate-y-1 transition-all">
                  Get Started
                </a>
                <a href="#features" className="px-8 py-3 border border-mint/50 text-mint font-semibold rounded-lg hover:bg-mint/10 transition-all">
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Visual */}
            <div className="animate-fade-in-down relative h-96">
              <div className="absolute inset-0 bg-gradient-to-r from-teal/20 to-mint/20 rounded-2xl blur-3xl"></div>
              <div className="relative z-10 h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-xl p-8 flex flex-col justify-center items-center hover:border-mint/40 transition-all">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-2xl font-bold text-center mb-2">Smart Tracking</h3>
                <p className="text-slate-400 text-center">Real-time updates and transparent workflow management</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 border-t border-slate-700/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-400">Everything you need for efficient complaint management</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="card p-6 hover:border-mint/60 group animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 px-6 border-t border-slate-700/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-slate-400">Simple 4-step complaint resolution process</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="relative animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-teal to-transparent"></div>
                )}
                <div className="card p-6 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal to-mint flex items-center justify-center font-bold text-dark-navy mb-4 text-lg">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section id="login-section" className="py-20 px-6 border-t border-slate-700/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Access Your Account</h2>
            <p className="text-xl text-slate-400">Choose your role to get started</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roleLogins.map((roleLogin, idx) => (
              <Link
                key={roleLogin.role}
                href={`/login?role=${roleLogin.role}`}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="card p-8 text-center cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">{roleLogin.icon}</div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-mint transition-colors">{roleLogin.label}</h3>
                  <p className="text-slate-400 text-sm">Sign in with your credentials</p>
                  <div className="mt-4 text-mint font-semibold group-hover:translate-x-2 transition-transform inline-block">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-700/30 text-center text-slate-400">
        <p>© 2026 Smart Campus Complaint Management System. All rights reserved.</p>
      </footer>
    </main>
  );
}
