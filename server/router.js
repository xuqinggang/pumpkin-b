import Router from 'koa-router';
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match, cteateRoutes } from 'react-router';
import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';

import routes from '../src/routes';

const router = new Router();

router.get('*', (ctx, next) => {
    const context = {};
    const content = renderToString(
        <StaticRouter location={ctx.request.url} context={context}>
            {renderRoutes(routes)}
        </StaticRouter>
    );
    ctx.body = content;
});

module.exports = router;
