import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking — nobody can embed this site in an iframe
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // Stop browsers from guessing MIME types (MIME-sniffing attacks)
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Referrer leakage control
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Force HTTPS for 1 year (includeSubDomains), eligible for preload list
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // Legacy XSS filter for old browsers
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // Disable browser features not needed on a legal services site
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'bluetooth=()',
      'ambient-light-sensor=()',
      'accelerometer=()',
      'gyroscope=()',
      'magnetometer=()',
    ].join(', '),
  },
  // Content Security Policy — whitelist only known-good sources
  {
    key: 'Content-Security-Policy',
    value: [
      // Default: only same origin
      "default-src 'self'",
      // Scripts: self + Sanity Studio inline scripts need unsafe-inline for studio, Google Fonts
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.sanity.io https://api.web3forms.com",
      // Styles: self + Google Fonts + inline styles needed by Sanity Studio
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts: Google Fonts CDN + Sanity
      "font-src 'self' https://fonts.gstatic.com data:",
      // Images: self + Sanity CDN + data URIs (for SVG grain texture)
      "img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io",
      // Fetch/XHR: self + Sanity API + Web3Forms API
      "connect-src 'self' https://api.sanity.io https://*.api.sanity.io wss://*.api.sanity.io https://api.web3forms.com https://cdn.sanity.io",
      // Frames: Sanity Studio uses iframes internally
      "frame-src 'self' https://cdn.sanity.io",
      // Workers: needed by Sanity Studio
      "worker-src 'self' blob:",
      // Block all object/embed elements
      "object-src 'none'",
      // Restrict base tag
      "base-uri 'self'",
      // Only allow form submissions to self and Web3Forms
      "form-action 'self' https://api.web3forms.com",
      // Upgrade insecure requests
      "upgrade-insecure-requests",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig;
