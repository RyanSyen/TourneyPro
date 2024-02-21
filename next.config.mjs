import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
  sassOptions: {
    // includePaths: [path.join(__dirname, "styles")],
  },
};

export default bundleAnalyzer(nextConfig);
