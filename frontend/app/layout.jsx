import "../styles/globals.css";

export const metadata = {
  title: "Smart Campus Complaint Management",
  description: "Real-time complaint and service workflow platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%230A7075' width='100' height='100' rx='20'/><text x='50' y='65' font-size='50' font-weight='bold' text-anchor='middle' fill='white'>S</text></svg>" />
      </head>
      <body className="bg-dark-navy text-slate-200 antialiased">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
