import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services/dirt-work",
        destination: "/showroom/dirt-work",
        permanent: true,
      },
      {
        source: "/services/concrete",
        destination: "/showroom/concrete",
        permanent: true,
      },
      {
        source: "/services/demo",
        destination: "/showroom/demo",
        permanent: true,
      },
      {
        source: "/services/roofing",
        destination: "/showroom/roofing",
        permanent: true,
      },
      {
        source: "/services/branding",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
