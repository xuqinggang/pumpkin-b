const webpack = require('webpack');
const fse = require('fs-extra');
const chalk = require('chalk');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const webpackConfig = require('./webpack.config.js');
const webpackExecutor = require('./utils.js').webpackExecutor;

fse.remove('./dist')
    .then(() => {
        console.log('删除dist目录');
        return fse.remove('./public');
    })
    .then(() => {
        console.log('删除public目录');
        console.log('启动watch');
    })
    .then(() => {
        const compiler = webpack(webpackConfig);

        compiler.apply(new ProgressPlugin({
          profile: false,
        }));

        compiler.watch({}, (err, multiStats) => {
            if (err) throw err;

            multiStats.stats.forEach((Stats) => {
                process.stdout.write(Stats.toString({
                  colors: true,
                  modules: false,
                  children: false,
                  chunks: false,
                  chunkModules: false,
                  errors: true,
                }) + '\n\n');
            })

            console.log(chalk.green('更新完成'));

            console.log(chalk.blue('开始复制模板'));
            fse.copySync('./public/indexTemplate.html', './server/views/index.html');
            console.log(chalk.blue('复制模板完成'));
        });
    })
    .catch(err => {
        console.log(err);
    });
