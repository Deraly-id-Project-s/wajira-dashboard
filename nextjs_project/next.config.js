/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    disableStaticImages: true, // If you're using static image imports
    unoptimized: true,
  },
};

module.exports = nextConfig;
