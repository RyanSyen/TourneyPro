import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    taint: true, // prevent sensitive val from being passed to client
  },
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "images.t2u.io",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "tourneypro.vercel.app",
      },
    ],
  },
  sassOptions: {
    // includePaths: [path.join(__dirname, "styles")],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          // {
          //   key: 'X-Frame-Options',
          //   value: 'DENY',
          // },
          // {
          //   key: 'Content-Security-Policy',
          //   value:
          //     "default-src 'self' 'https://blog.logrocket.com'; image-src 'https://unsplash.com'; script-src 'self' https://www.google-analytics.com; font-src 'self' 'https://fonts.googleapis.com'",
          // },
          // {
          //   key: 'X-Content-Type-Options',
          //   value: 'nosniff',
          // },
          // {
          //   key: 'Permissions-Policy',
          //   value: "camera=(); battery=(self); geolocation=(); microphone=('https://a-domain.com')",
          // },
          // {
          //   key: 'Referrer-Policy',
          //   value: 'origin-when-cross-origin',
          // },
        ],
      },
    ];
  },
};

export default bundleAnalyzer(nextConfig);
