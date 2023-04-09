/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process?.env?.CODESPACE_NAME ? `https://${process.env.CODESPACE_NAME}-5000.preview.app.github.dev` : 'http://localhost:5000'
  }
}

module.exports = nextConfig
