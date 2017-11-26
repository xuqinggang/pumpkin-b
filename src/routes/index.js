import App from '../App';
import ListPage from '../pages/ListPage';
import IndexPage from '../pages/IndexPage';
import HouseUploadPage from '../pages/HouseUpload';
import HouseModify from '../pages/HouseModify';
import ProfilePage from '../pages/ProfilePage';
import HouseManage from '../pages/HouseManage';
import LoginPage from '../pages/LoginPage';
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
                path: '/login',
                exact: true,
                component: LoginPage,
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
                path: '/house-manage',
                exact: true,
                component: HouseManage,
            },
            {
                path: '/profile',
                exact: true,
                component: ProfilePage,
            },
            {
                path: '/house-modify',
                exact: true,
                component: HouseModify,
            },
            {
                path: '*',
                component: NotFound,
            },
        ],
    },
];

export default routes;
