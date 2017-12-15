import Login from 'modules/Login';
import EmptyLayout from 'layouts/EmptyLayout';
import BaseComponent from 'components/BaseComponent';
import checkAuthenticated from 'base/checkAuthenticated';
import './style.less';

class LoginPage extends BaseComponent {
    render() {
        const clsPrefix = 'p-login';
        return (
            <EmptyLayout
                title="南瓜管家"
            >
                <div className={clsPrefix}>
                    <Login />
                </div>
            </EmptyLayout>
        );
    }
}

export default checkAuthenticated(LoginPage);
