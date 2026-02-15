/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable image optimization for production
    formats: ['image/avif', 'image/webp'],
  },
  // Production optimization
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
}

export default nextConfig
