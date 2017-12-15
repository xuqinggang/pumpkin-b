const argv = require('optimist').argv;
const http = require('http');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const compress = require('koa-compress');
const logger = require('koa-logger');
const KoaStatic = require('koa-static');
// const render = require('koa-ejs');
const views = require('koa-views');
const httpProxy = require('http-proxy');
const conf = require('../config/index');
const router = require('../dist/server');

const server = new Koa();
const proxy = httpProxy.createProxyServer();
const serverRouter = new Router();

const PORT = argv.port ? parseInt(argv.port) : 3000;

const env = argv.env ? argv.env : 'dev';

server.use(views(__dirname + '/views', {
  map: {
    html: 'handlebars',
  }
}));

serverRouter.all(/api\/v1/, (ctx) => {
    ctx.respond = false;
    proxy.web(ctx.req, ctx.res, {
        target: conf[env].backend.target,
        headers: {
            host: conf[env].backend.host,
        },
    }, (e) => {console.log(e);});
});

server.use(compress());
server.use(logger());
server.use(KoaStatic('public'));
server.use(serverRouter.routes());
server.use(router.routes());

server.listen(PORT, (err) => {
    if (err) {
        console.log('error: ', err);
        return;
    }
    console.log(`server start at port: ${PORT}`);
});
