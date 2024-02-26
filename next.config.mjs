/** @type {import('next').NextConfig} */
const nextConfig = {
  // define hostnames for next/image component
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
  // sass compiler config
  sassOptions: {
    // includePaths: [path.join(__dirname, "styles")],
  },
};

export default nextConfig;
