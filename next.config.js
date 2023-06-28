// next.config.js

// You can choose which headers to add to the list
// after learning more below.

const ContentSecurityPolicy = `
  default-src 'self'  localhost:* *.vercel.app *.vercel.com  ;
  img-src 'self' data: *;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel.app *.vercel.com  ;
  style-src 'self' 'unsafe-inline' *.vercel.app *.vercel.com  ;
  font-src 'self' data: *.vercel.app *.vercel.com  ;


`;
const securityHeaders = [
	{
		key: "X-DNS-Prefetch-Control",
		value: "on",
	},
	{
		key: "Strict-Transport-Security",
		value: "max-age=63072000; includeSubDomains; preload",
	},
	{
		key: "X-XSS-Protection",
		value: "1; mode=block",
	},
	{
		key: "X-Frame-Options",
		value: "SAMEORIGIN",
	},
	{
		key: "Permissions-Policy",
		value: "camera=(self), microphone=(), geolocation=(self), browsing-topics=()",
	},
	{
		key: "X-Content-Type-Options",
		value: "nosniff",
	},
	{
		key: "Referrer-Policy",
		value: "origin-when-cross-origin",
	},
	// {
	//     key: 'Content-Security-Policy',
	//     value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
	// }
];

module.exports = {
	async headers() {
		return [
			{
				// Apply these headers to all routes in your application.
				source: "/:path*",
				headers: securityHeaders,
			},
		];
	},
};
