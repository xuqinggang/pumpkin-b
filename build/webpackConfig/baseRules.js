const path = require('path');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (context) => {
    return [
        //css && less rules
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                ]
            })
        },
        {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    'less-loader',
                ],
            })
        },
        //js rules
        {
            test: /\.js$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            options: {
                formatter: eslintFriendlyFormatter,
            },
        },
        {
            test: /\.js$/,
            exclude: /\/node_modules\//,
            loader: 'babel-loader',
        },
        //assets rules
        {
            test: /\.(svg|eot|woff2?|ttf|otf)$/,
            loader: 'url-loader',
            options: {
                limit: 4096,
                name: 'fonts/[name].[hash:8].[ext]',
            },
        },
        {
            test: /\.(png|jpe?g|gif|webp)$/,
            loader: 'url-loader',
            options: {
                limit: 4096,
                name: 'images/[name].[hash:8].[ext]',
            },
        },
    ];
};
