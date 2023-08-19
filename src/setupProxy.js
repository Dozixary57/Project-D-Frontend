const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (fastify) {

    fastify.use(
        '/Items',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );

    fastify.use(
        '/Item/:id',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );

    fastify.use(
        '/GridFS/Cover/:id',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );

    fastify.use(
        '/Authentication/Login',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );

    fastify.use(
        '/Authentication/Logout',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );
};