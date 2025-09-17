import type { MetadataRoute } from 'next';
import { getBaseUrl } from '../lib/urls/urls';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*', // API endpoints
          '/_next/*', // Next.js internal files
          '/auth/*', // Authentication pages
          '/admin/*', // Admin pages (if any)
        ],
      },
      // Optional: More specific rules for different bots
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/*', '/_next/*', '/auth/*'],
      },
    ],
    sitemap: `${getBaseUrl()}/sitemap.xml`,
    host: getBaseUrl(),
  };
}
