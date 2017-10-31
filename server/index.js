const Koa = require('koa');
const KoaStatic = require('koa-static');
const compress = require('koa-compress');
const logger = require('koa-logger');
const router = require('./router');
const conf = require('./conf');

const app = new Koa();

app.use(logger());
app.use(KoaStatic(conf.staticPath));
app.use(compress());
app.use(router.routes());

app.listen(conf.port, (err) => {
    if (err) {
        console.log('error: ', err);
        return;
    }
    console.log(`server start at port: ${conf.port}`);
});
