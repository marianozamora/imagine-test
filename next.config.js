// next.config.js

// You can choose which headers to add to the list
// after learning more below.

const ContentSecurityPolicy = `
  default-src 'self'  localhost:* *.vercel.app *.vercel.com *.google.com *.googleapis.com authjs.dev *.mapbox.com data: blob: ws: wss: ;
  script-src 'self'  blob: 'unsafe-inline' 'unsafe-eval' *.google.com *.googleapis.com *.gstatic.com *.vercel.app *.vercel.com;
  child-src 'self' blob:;
  img-src 'self' data: blob: *.cloudinary.com;
  worker-src 'self' blob: *.googleapis.com *.gstatic.com *.vercel.app *.vercel.com *.mapbox.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com *.gstatic.com *.vercel.app *.vercel.com *.mapbox.com;
  font-src 'self' data:  *.googleapis.com *.gstatic.com *.vercel.app *.vercel.com *.mapbox.com;
  connect-src 'self' *.vercel.app *.vercel.com *.googleapis.com *.gstatic.com *.google.com ;

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
	{
	    key: 'Content-Security-Policy',
	    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
	}
];

module.exports = {
	images: {
		domains: ["res.cloudinary.com"],
	},
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
