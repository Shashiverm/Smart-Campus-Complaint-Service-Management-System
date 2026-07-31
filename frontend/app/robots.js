export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/admin/sensitive/"],
      },
    ],
    sitemap: "https://smartcampus.edu/sitemap.xml",
    host: "https://smartcampus.edu",
  };
}
