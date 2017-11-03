module.export = {
    isMock: false,
    apis: {
        hello: {
            path: /\/hello/,
            url: 'http://www.baidu.com',
            mockUrl: 'http://www.sohu.com',
        },
        test: {
            path: /\/test/,
            url: 'http://www.yanhao.com',
            mockUrl: 'http://www.mock.com',
        },
    },
};
