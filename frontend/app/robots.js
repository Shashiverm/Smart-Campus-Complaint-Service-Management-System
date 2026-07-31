export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/admin/sensitive/"],
      },
    ],
    sitemap: "https://sccsms.vercel.app/sitemap.xml",
    host: "https://sccsms.vercel.app",
    crawlDelay: 500
  };
}
