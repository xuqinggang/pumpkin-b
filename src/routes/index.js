import App from '../App';
import ListPage from '../pages/ListPage';
import IndexPage from '../pages/IndexPage';
import HouseUploadPage from '../pages/HouseUpload/index';
import ProfilePage from '../pages/ProfilePage';
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
                path: '/house-upload',
                exact: true,
                component: HouseUploadPage,
            },
            {
                path: '/profile',
                exact: true,
                component: ProfilePage,
            },
            {
                path: '*',
                component: NotFound,
            },
        ],
    },
];

export default routes;
