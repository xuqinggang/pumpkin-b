const Router = require('koa-router');
const router = new Router();

router.get('/hello', (ctx, next) => {
    ctx.body = 'Hello KuiaZhan';
});


router.get('/test', (ctx, next) => {
    ctx.body = 'Hello KuiaZhan Test';
});


module.exports = router;
