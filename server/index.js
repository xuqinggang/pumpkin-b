const http = require('http');
const path = require('path');
const Koa = require('koa');
const compress = require('koa-compress');
const logger = require('koa-logger');
const KoaStatic = require('koa-static');
// const render = require('koa-ejs');
const views = require('koa-views');
const conf = require('./conf');
const router = require('../dist/server');

const server = new Koa();

server.use(views(__dirname + '/views', {
  map: {
    html: 'handlebars',
  }
}));
// render(server, {
    // root: path.join(__dirname, 'views'),
    // layout: false,
    // viewExt: 'html',
    // cache: false,
    // debug: false
// });

server.use(compress());
server.use(logger());
server.use(KoaStatic('public'));
server.use(router.routes());

server.listen(conf.port, (err) => {
    if (err) {
        console.log('error: ', err);
        return;
    }
    console.log(`server start at port: ${conf.port}`);
});
