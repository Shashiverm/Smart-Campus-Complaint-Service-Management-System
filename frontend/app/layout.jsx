import "../styles/globals.css";
import SeoJsonLd from "../components/SeoJsonLd";
import CookieConsent from "../components/CookieConsent";

export const viewport = {
  themeColor: "#0a7075",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL("https://smartcampus.edu"),
  title: {
    default: "Smart Campus Complaint & Service Management System",
    template: "%s | Smart Campus System"
  },
  description: "Enterprise-grade real-time complaint, facility issue tracking, and service management system for educational institutions. Automated routing for Students, Faculty, Staff, and Admins.",
  keywords: [
    "Smart Campus",
    "Campus Complaint System",
    "University Service Desk",
    "College Issue Management",
    "Student Grievance System",
    "Faculty Service Request",
    "Real-time Issue Tracker",
    "FERPA Compliant System"
  ],
  authors: [{ name: "Smart Campus Technology Team" }],
  creator: "Smart Campus Engineering",
  publisher: "Smart Campus Educational Systems",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smartcampus.edu",
    title: "Smart Campus Complaint & Service Management Platform",
    description: "Empowering campus communities with automated issue routing, real-time status visibility, transparent accountability, and FERPA-compliant privacy controls.",
    siteName: "Smart Campus Complaint Management System",
    images: [
      {
        url: "/images/hero_campus_tech.png",
        width: 1200,
        height: 630,
        alt: "Smart Campus Complaint Management Operations Hub Visual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Campus Complaint & Service Management System",
    description: "Automated real-time campus issue resolution and service tracking for Students, Faculty, and Administrators.",
    images: ["/images/hero_campus_tech.png"],
  },
  alternates: {
    canonical: "https://smartcampus.edu",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%230A7075' width='100' height='100' rx='20'/><text x='50' y='65' font-size='50' font-weight='bold' text-anchor='middle' fill='white'>S</text></svg>"
        />
        <SeoJsonLd />
      </head>
      <body className="bg-dark-navy text-slate-200 antialiased font-sans selection:bg-teal selection:text-white">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
