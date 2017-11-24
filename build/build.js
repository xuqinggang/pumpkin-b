const webpack = require('webpack');
const fse = require('fs-extra');
const chalk = require('chalk');
const webpackConfig = require('./webpack.config.js');
const { webpackExecutor } = require('./utils.js');

fse.remove('./dist')
    .then(() => {
        console.log('删除dist目录');
        return fse.remove('./public');
    })
    .then(() => {
        console.log('删除public目录');
    })
    .then(() => {
        return webpackExecutor(webpackConfig);
    })
    .then(() => {
            console.log(chalk.blue('开始复制模板'));
            fse.copySync('./public/indexTemplate.html', './server/views/index.html');
            console.log(chalk.blue('复制模板完成'));
    })
    .catch(err => {
        console.error(err);
    });
