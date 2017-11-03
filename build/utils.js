const chalk = require('chalk');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

const webpackExecutor = (config) => {
  return new Promise ((resolve, reject) => {
    const compiler = webpack(config);

    compiler.apply(new ProgressPlugin({
        profile: false,
    }));

    compiler.run((err, stats) => {
        if (err) {
            reject();
        }

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        console.log(chalk.cyan('  Build complete.\n'));
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ));
        resolve();
    });
  });
};

module.exports = {
    webpackExecutor,
};
