const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@services': path.resolve(__dirname, 'src/backend/services'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@images': path.resolve(__dirname, 'src/images'),
    },
  },
};