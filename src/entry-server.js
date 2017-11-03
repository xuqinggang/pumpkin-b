import Router from 'koa-router';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import routes from './routes';
import reducers from './reducers';

const router = new Router();

const store = createStore(reducers, applyMiddleware(thunk));

router.get('*', async (ctx) => {
    const branch = matchRoutes(routes, ctx.request.url);
    const promises = branch.map(({ route }) => {
        const fetchData = route.component.fetchData;
        return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null);
    });

    await Promise.all(promises).then(async () => {
        const context = {};
        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={ctx.request.url} context={context}>
                    {renderRoutes(routes)}
                </StaticRouter>
            </Provider>,
        );
        if (context.status === 404) {
            ctx.status = 404;
            ctx.body = content;
        } else {
            await ctx.render('index', { content, serverState: JSON.stringify(store.getState()) });
        }
    });
});

module.exports = router;
