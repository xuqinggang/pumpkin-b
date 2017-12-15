module.exports = {
    dev: {
        pathPrefix: '/',
        publicPath: '/',
        backend: {
            target: 'http://10.23.64.8',
            host: 'dev.api.console.nanguazufang.cn',
        },
    },
    test: {
        pathPrefix: '/',
        publicPath: '/',
        backend: {
            target: 'http://10.23.64.8',
            host: 'test.api.console.nanguazufang.cn',
        },
    },
    prod: {
        pathPrefix: '/',
        publicPath: '//static-1252921496.file.myqcloud.com/pumpkin-b',
        backend: {
            target: 'http://nangua-console.kuaizhan.sohuno.com',
            host: 'http://nangua-console.kuaizhan.sohuno.com',
        },
    },
    server: {
        distPath: './dist',
    },
    client: {
        distPath: './public',
    },
};
