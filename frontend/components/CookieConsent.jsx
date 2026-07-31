"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    performance: true,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie_consent", JSON.stringify({ essential: true, analytics: true, performance: true }));
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem("cookie_consent", JSON.stringify({ essential: true, analytics: false, performance: false }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie_consent", JSON.stringify(preferences));
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:max-w-md z-50 animate-fade-in-up">
      <div className="card p-5 border-teal/40 bg-slate-900/95 backdrop-blur-xl shadow-2xl rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal via-mint to-teal"></div>
        
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5">🍪</span>
          <div className="space-y-2">
            <h4 className="font-bold text-white text-base">Cookie & Privacy Preferences</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              We use essential cookies to maintain secure role authentication, campus session tracking, and optimal dashboard performance. See our{" "}
              <Link href="/privacy" className="text-mint underline hover:text-mint/80">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
          </div>
        </div>

        {showPreferences && (
          <div className="mt-4 pt-4 border-t border-slate-700/60 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Essential Cookies</p>
                <p className="text-slate-400">Required for login sessions & security</p>
              </div>
              <input type="checkbox" checked disabled className="rounded text-mint focus:ring-mint cursor-not-allowed" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Analytics Cookies</p>
                <p className="text-slate-400">Help us optimize issue response metrics</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="rounded text-mint focus:ring-mint cursor-pointer"
              />
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          {!showPreferences ? (
            <>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-gradient-to-r from-teal to-mint text-dark-navy font-bold text-xs rounded-lg hover:shadow-lg hover:shadow-teal/30 transition-all flex-1"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-3 py-2 border border-slate-600 text-slate-300 font-semibold text-xs rounded-lg hover:bg-slate-800 transition-all"
              >
                Essential Only
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="px-2 py-2 text-mint text-xs hover:underline"
              >
                Customize
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 bg-mint text-dark-navy font-bold text-xs rounded-lg hover:bg-mint/90 transition-all flex-1"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setShowPreferences(false)}
                className="px-3 py-2 text-slate-400 text-xs hover:text-white"
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
