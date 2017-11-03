import App from '../App';
import IndexPage from '../pages/IndexPage';
import ListPage from '../pages/ListPage';
import NotFound from '../pages/NotFound';

const routes = [
    {
        component: App,
        routes: [
            {
                path: '/',
                exact: true,
                component: IndexPage,
            },
            {
                path: '/list',
                exact: true,
                component: ListPage,
            },
            {
                path: '*',
                component: NotFound,
            },
        ],
    },
];

export default routes;
