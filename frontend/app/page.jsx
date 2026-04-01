import Link from "next/link";

export default function HomePage() {
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
      <section className="relative pt-10 md:pt-16 pb-20 md:pb-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-10 items-center">
            {/* Left Content */}
            <div className="animate-fade-in-up space-y-5 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/15 border border-teal/40 rounded-full">
                <span className="text-sm font-semibold text-mint">✨ Next-Gen Campus Platform</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-white tracking-tight">
                Resolve Campus Issues
                <span className="block bg-gradient-to-r from-mint to-teal bg-clip-text text-transparent">
                  Faster, Clearer, Better
                </span>
              </h1>

              <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
                A unified complaint and service platform where students, faculty, and staff raise issues,
                responsible teams act quickly, and administrators monitor complete resolution in real-time.
              </p>

              <div className="grid grid-cols-3 gap-2 md:gap-3 max-w-xl">
                <div className="card p-3 md:p-4 text-center">
                  <p className="text-lg md:text-xl font-bold text-mint">24/7</p>
                  <p className="text-[11px] md:text-xs text-slate-400">Issue Tracking</p>
                </div>
                <div className="card p-3 md:p-4 text-center">
                  <p className="text-lg md:text-xl font-bold text-mint">Live</p>
                  <p className="text-[11px] md:text-xs text-slate-400">Status Updates</p>
                </div>
                <div className="card p-3 md:p-4 text-center">
                  <p className="text-lg md:text-xl font-bold text-mint">Secure</p>
                  <p className="text-[11px] md:text-xs text-slate-400">Role Access</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href="#login-section" className="px-6 md:px-8 py-3 text-center bg-gradient-to-r from-teal to-mint text-dark-navy font-semibold rounded-lg hover:shadow-lg hover:shadow-teal/50 transform hover:-translate-y-1 transition-all">
                  Get Started
                </a>
                <a href="#features" className="px-6 md:px-8 py-3 text-center border border-mint/50 text-mint font-semibold rounded-lg hover:bg-mint/10 transition-all">
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Visual */}
            <div className="animate-fade-in-down relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal/20 to-mint/20 rounded-2xl blur-3xl"></div>
              <div className="relative z-10 card p-6 md:p-8 lg:p-10 min-h-[280px] md:min-h-[340px] flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-mint">Live Operations</p>
                  <span className="text-3xl md:text-4xl">📋</span>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Smart Tracking</h3>
                  <p className="text-slate-300">Real-time updates, clear accountability, and transparent issue lifecycle tracking.</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700/50">
                  <div>
                    <p className="text-xs text-slate-400">Response Visibility</p>
                    <p className="text-sm font-semibold text-white">End-to-End Timeline</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Management</p>
                    <p className="text-sm font-semibold text-white">Role-Based Control</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-6 -mt-16">
        <div className="max-w-6xl mx-auto card p-5 md:p-6 border-mint/40 bg-gradient-to-r from-slate-800/70 to-teal/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-mint">Unified Access</p>
              <h3 className="text-xl md:text-2xl font-bold">One Login Portal for Every Campus Role</h3>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-mint to-teal text-dark-navy font-bold rounded-lg"
            >
              Open Login Portal
            </Link>
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
            <p className="text-xl text-slate-400">Single login page with role selector and ID/password</p>
          </div>

          <div className="max-w-xl mx-auto card p-8 text-center animate-fade-in-up">
            <p className="text-5xl mb-4">🔐</p>
            <h3 className="text-2xl font-bold mb-2">Campus Login Portal</h3>
            <p className="text-slate-400 mb-6">Choose your role from a dropdown, then sign in using your college email or ID and password.</p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-teal to-mint text-dark-navy font-bold rounded-lg hover:shadow-lg hover:shadow-teal/50"
            >
              Continue to Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 border-t border-slate-700/30 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-bold text-white">Smart Campus</h4>
            <p className="text-sm text-slate-400 mt-2">A transparent complaint management platform for students, faculty, staff, and leadership.</p>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3">Quick Links</h5>
            <div className="space-y-2 text-sm">
              <a href="#features" className="block text-slate-400 hover:text-mint transition-colors">Features</a>
              <a href="#login-section" className="block text-slate-400 hover:text-mint transition-colors">Login Portal</a>
              <Link href="/login" className="block text-slate-400 hover:text-mint transition-colors">Sign In</Link>
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3">Support</h5>
            <p className="text-sm text-slate-400">For account help, contact your department administrator.</p>
            <p className="text-sm text-slate-500 mt-3">Monitored with real-time status updates and activity timeline.</p>
          </div>
        </div>
        <div className="border-t border-slate-700/40 py-4 text-center text-xs text-slate-500">
          © 2026 Smart Campus Complaint Management System. Built for responsive campus operations.
        </div>
      </footer>
    </main>
  );
}
