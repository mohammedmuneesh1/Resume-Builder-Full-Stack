import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    domains: ["res.cloudinary.com"
      ,"via.placeholder.com"
      ,"ui-avatars.com",
      "static.resumecoach.com" 
    ],   // 👈 Add this
  },
};

export default nextConfig;
