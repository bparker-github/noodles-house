// @ts-check

/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',

  // Configure external images.
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
        pathname: '*',
        port: '',
        protocol: 'https',
      },
      {
        hostname: 'tailwindui.com',
        pathname: 'img/*',
        port: '',
        protocol: 'https',
      },
    ],
  },
};
