/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/admin", // URL path the user visits
        destination: "http://127.0.0.1:8000/admin", // Where they should be redirected to
        permanent: false, // Set to true for a permanent redirect (301), or false for temporary (307)
      },
    ];
  },
};

export default nextConfig;
