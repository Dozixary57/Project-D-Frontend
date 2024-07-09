const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (fastify) {

  fastify.use(
    '/Items',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );

  // fastify.use(
  //     '/Items-WS',
  //     createProxyMiddleware({
  //         target: 'ws://localhost:5000',
  //         changeOrigin: true,
  //     })
  // );

  fastify.use(
    '/Item/:id',
    createProxyMiddleware({
      target: `${process.env.REACT_APP_DATA_API}`,
      changeOrigin: true,
    })
  );

  fastify.use(
    '/Data/News_Types',
    createProxyMiddleware({
      target: `${process.env.REACT_APP_DATA_API}`,
      pathRewrite: { '^/Data/News_Types': '/News_Types' },
      changeOrigin: true,
    })
  );

  fastify.use(
    '/Data/All_News',
    createProxyMiddleware({
      target: `${process.env.REACT_APP_DATA_API}`,
      pathRewrite: { '^/Data/All_News': '/All_News' },
      changeOrigin: true,
    })
  );

  fastify.use(
    '/One_News/:titleId',
    createProxyMiddleware({
      target: `${process.env.REACT_APP_DATA_API}`,
      changeOrigin: true,
    })
  );

  fastify.use(
    '/GridFS/Cover/:id',
    createProxyMiddleware({
      target: `${process.env.REACT_APP_DATA_API}`,
      changeOrigin: true,
    })
  );

  // fastify.use(
  //   '/Authentication/Login',
  //   createProxyMiddleware({
  //     target: `${process.env.REACT_APP_AUTH_API}`,
  //     pathRewrite: { '^/Authentication/Login': '/Login' },
  //     changeOrigin: true,
  //   })
  // );
  // fastify.use(
  //   '/Authentication/Signup',
  //   createProxyMiddleware({
  //     target: `${process.env.REACT_APP_AUTH_API}`,
  //     pathRewrite: { '^/Authentication/Signup': '/Signup' },
  //     changeOrigin: true,
  //   })
  // );
  // fastify.use(
  //   '/Authentication/Auth',
  //   createProxyMiddleware({
  //     target: `${process.env.REACT_APP_AUTH_API}`,
  //     pathRewrite: { '^/Authentication/Auth': '/Auth' },
  //     changeOrigin: true,
  //   })
  // );
  // fastify.use(
  //   '/Authentication/Logout',
  //   createProxyMiddleware({
  //     target: `${process.env.REACT_APP_AUTH_API}`,
  //     pathRewrite: { '^/Authentication/Logout': '/Logout' },
  //     changeOrigin: true,
  //   })
  // );

  // fastify.use(
  //   '/Accounts',
  //   createProxyMiddleware({
  //     target: `${process.env.REACT_APP_AUTH_API}`,
  //     changeOrigin: true,
  //   })
  // );
  // fastify.use(
  //   '/Account/:id',
  //   createProxyMiddleware({
  //     target: `${process.env.REACT_APP_AUTH_API}`,
  //     changeOrigin: true,
  //   })
  // );

  // fastify.use(
  //   '/Account/Update',
  //   createProxyMiddleware({
  //     target: `${process.env.REACT_APP_AUTH_API}`,
  //     changeOrigin: true,
  //   })
  // );

  // fastify.use(
  //   '/User/Statuses',
  //   createProxyMiddleware({
  //     target: `${process.env.REACT_APP_AUTH_API}`,
  //     changeOrigin: true,
  //   })
  // );
  // fastify.use(
  //   '/User/Privileges',
  //   createProxyMiddleware({
  //     target: `${process.env.REACT_APP_AUTH_API}`,
  //     changeOrigin: true,
  //   })
  // );
};