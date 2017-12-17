const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = dir => path.resolve(__dirname, '..', dir);
const baseConfig = require('../config');
const basePlugins = require('./webpackConfig/basePlugins.js');
const baseRules = require('./webpackConfig/baseRules.js');
const env = process.env;

env.NODE_ENV = env.NODE_ENV || 'dev';

const context = {
    env,
    pathPrefix: baseConfig[env.NODE_ENV].pathPrefix,
    rootDir: resolve('./'),
}

module.exports = {
    entry: {
        app: resolve('src/entry-client.js'),
        vendors: [
            'react',
            'redux',
            'react-dom',
            'react-redux',
            'react-router',
            'prop-types',
        ],
    },

    output: {
        publicPath: baseConfig[env.NODE_ENV].publicPath,
        path: resolve(baseConfig.client.distPath),
        filename: '[name].[chunkhash:8].js',
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            src: resolve('src'),
            conf: resolve('src/conf'),
            components: resolve('src/components'),
            layouts: resolve('src/layouts'),
            pages: resolve('src/pages'),
            routes: resolve('src/routes'),
            base: resolve('src/base'),
            modules: resolve('src/modules'),
            utils: resolve('src/utils'),
        },
    },

    module: {
        rules: [
            ...baseRules(context),
        ],

    },

    plugins: [
        ...basePlugins(context),
        new HtmlWebpackPlugin({
            favicon:'src/images/nangua.ico', //favicon路径
            filename: 'indexTemplate.html',
            template: 'src/index.html',
            hash: false,
            inject: true,
            minify: false,
        }),
    ],
}
