const clientConfig = require('./webpack.client.js');
const serverConfig = require('./webpack.server.js');

const webpackConfig = [
    clientConfig,
    serverConfig,
];

module.exports = webpackConfig;
