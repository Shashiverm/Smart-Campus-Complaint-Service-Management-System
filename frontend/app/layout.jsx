import "../styles/globals.css";

export const metadata = {
  title: "Smart Campus Complaint Management",
  description: "Real-time complaint and service workflow platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
