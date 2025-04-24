const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@services': path.resolve(__dirname, 'src/backend/services'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@images': path.resolve(__dirname, 'src/images'),
      '@tools': path.resolve(__dirname, 'src/tools'),
      '@_styles': path.resolve(__dirname, 'src/_styles'),
    },
  },
};