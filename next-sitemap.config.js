/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.odessajewellery.com", // Change to your actual domain
  generateRobotsTxt: true, // Generate robots.txt automatically
  sitemapSize: 5000, // Number of URLs per sitemap file
  changefreq: "daily", // How often Google should check for updates
  priority: 0.7, // Priority of URLs in the sitemap
};
