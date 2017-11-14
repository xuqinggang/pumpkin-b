import App from '../App';
import ListPage from '../pages/ListPage';
import MainLayout from '../layouts/MainLayout';
import HouseUploadPage from '../pages/HouseUpload/index';
import NotFound from '../pages/NotFound';

const routes = [
    {
        component: App,
        routes: [
            {
                path: '/',
                exact: true,
                component: MainLayout('ss'),
            },
            {
                path: '/list',
                exact: true,
                component: ListPage,
            },
            {
                path: '/house-upload',
                exact: true,
                component: MainLayout(HouseUploadPage),
            },
            {
                path: '*',
                component: NotFound,
            },
        ],
    },
];

export default routes;
