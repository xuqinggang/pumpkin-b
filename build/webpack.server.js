const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const resolve = dir => path.resolve(__dirname, '..', dir);
const baseConfig = require('../config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const StyleLintFormatter = require('stylelint-formatter-pretty');
const baseRules = require('./webpackConfig/baseRules.js');
const env = process.env;

env.NODE_ENV = env.NODE_ENV || 'dev';

const context = {
    env,
    pathPrefix: baseConfig.prod.pathPrefix,
    rootDir: resolve('./'),
}

module.exports = {
    entry: {
        app: ['babel-polyfill', resolve('src/entry-server.js')],
    },

    output: {
        publicPath: baseConfig.prod.publicPath,
        path: resolve(baseConfig.prod.distPath),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
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
        },
    },

    module: {
        rules: [
            ...baseRules(context),
        ],

    },

    plugins: [
        new StyleLintPlugin({
            syntax: 'less',
            files: 'src/**/*.l?(e|c)ss',
            formatter: StyleLintFormatter,
        }),

        new webpack.ProvidePlugin({
            React: 'react',
        }),

        new ExtractTextPlugin({
            filename: `css/[name].[contenthash:8].css`
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            hash: false,
            inject: true,
        }),
    ],

    devServer: {
        port: baseConfig.dev.port,
        host: baseConfig.dev.host,
        proxy: baseConfig.dev.proxy,
    },

    target: 'node',
    externals: [nodeExternals()],
}
