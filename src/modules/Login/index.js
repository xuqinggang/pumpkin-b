// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent';
import Input from 'components/Input';
// import Button from 'components/Button';
import { passportLogin } from '../Passport/actions';
import './style.less';

class Login extends BaseComponent {
    constructor(props) {
        super(props);

        this.autoBind(
            'handleSubmit',
            'handlePasswdChange',
            'handleAccountChange',
            'handleChange',
        );

        this.state = {
            account: '',
            password: '',
        };
    }

    handleSubmit() {
        const { dispatch } = this.props;
        const { account, password } = this.state;

        dispatch(passportLogin({
            account,
            password,
        }));
    }

    handlePasswdChange({ value }) {
        this.setState({
            password: value,
        });
    }

    handleAccountChange({ value }) {
        this.setState({
            account: value,
        });
    }

    render() {
        const clsPrefix = 'm-login';
        return (
            <div className={clsPrefix}>
                <div className={`${clsPrefix}--title`}>南瓜租房</div>
                <div className={`${clsPrefix}--desc`}>一个真实，高效的长租公寓平台</div>
                <div className={`${clsPrefix}--cell`}>
                    <Input
                        className={`${clsPrefix}--input`}
                        type="text"
                        value={this.state.account}
                        placeholder="请输入账号/手机号"
                        name="account"
                        onChange={this.handleAccountChange}
                    />
                </div>
                <div className={`${clsPrefix}--cell`}>
                    <Input
                        className={`${clsPrefix}--input`}
                        type="password"
                        value={this.state.password}
                        placeholder="请输入密码"
                        name="password"
                        onChange={this.handlePasswdChange}
                    />
                </div>
                <div
                    className={`${clsPrefix}--submit`}
                    role="button"
                    tabIndex={0}
                    onClick={this.handleSubmit}
                >登录</div>
            </div>
        );
    }
}

// const defaultFunc = () => {};

Login.defaultProps = {};

Login.propTypes = {};


export default connect()(Login);
