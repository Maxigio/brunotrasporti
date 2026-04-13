/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permette accesso dev da ngrok (ignorato in produzione)
  allowedDevOrigins: ['productional-unfeeling-damon.ngrok-free.dev'],
}

module.exports = nextConfig
