export default async function sitemap() {
  const baseUrl = "https://sccsms.vercel.app"; // Production Vercel domain

  const routes = [
    "",
    "/login",
    "/dashboard",
    "/terms",
    "/privacy",
    "/compliance",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route === "" ? "daily" : "monthly",
    priority: route === "" ? 1.0 : route === "/login" ? 0.9 : 0.7,
  }));

  return routes;
}
