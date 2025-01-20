const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const fs = require('fs');

// Define las rutas de tu aplicación
const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: 'https://example.com' }); // Cambia por tu dominio
  const writeStream = createWriteStream('./public/sitemap.xml');
  sitemap.pipe(writeStream);

  routes.forEach((route) => {
    sitemap.write(route);
  });

  sitemap.end();
  await streamToPromise(sitemap);
  console.log('Sitemap generado con éxito en /public/sitemap.xml');
}

generateSitemap();
