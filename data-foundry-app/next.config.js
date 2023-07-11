/** @type {import('next').NextConfig} */

module.exports = { async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://fastapi:8000/:path*'
      }
    ]
  }
}