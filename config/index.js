module.exports = {
    dev: {
        port: 8888,
        host: 'www.dev.com',
        proxy: {},
    },
    prod: {
        pathPrefix: '/',
        publicPath: '/',
        distPath: './dist',
    },
}
