import { connect } from 'react-redux';
import Login from 'modules/Login';
import BaseComponent from 'components/BaseComponent';
import './style.less';

class LoginPage extends BaseComponent {
    render() {
        const clsPrefix = 'p-login';
        return (
            <div className={clsPrefix}>
                <Login />
            </div>
        );
    }
}

export default connect()(LoginPage);
