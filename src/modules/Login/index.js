import axios from 'axios';
import { connect } from 'react-redux';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent';
import Input from 'components/Input';
import { login } from 'modules/Passport/actions';
import './style.less';

class Login extends BaseComponent {
    constructor(props) {
        super(props);

        this.autoBind(
            'handleSubmit',
            'handlePasswdChange',
            'handleAccountChange',
            'handlePasswdBlur',
            'handleAccountBlur',
            'handleLoginFailure',
            'handleChange',
            'handleKeyPress',
        );

        this.state = {
            account: '',
            password: '',
            isAccountCorrect: true,
            isPasswordCorrect: false,
            accountError: '',
            passwordError: '',
            showAccountStatus: false,
            showPasswordStatus: false,
        };
    }

    handleSubmit() {
        const { account, password } = this.state;

        if (!account) {
            this.setState({
                isAccountCorrect: false,
                accountError: '用户名不能为空',
            });
            return;
        }

        if (!password) {
            this.setState({
                isPasswordCorrect: false,
                passwordError: '密码不能为空',
            });
            return;
        }
        axios.post('/v1/user/login', {
            userName: account,
            password,
        })
        .then((res) => {
            switch (res.data.code) {
            case 200: {
                // TODO
                // 不用手动更改url
                this.props.dispatch(login());
                break;
            }
            case 1101: {
                this.setState({
                    isAccountCorrect: false,
                    accountError: res.data.msg,
                });
                break;
            }
            case 1102: {
                this.setState({
                    isPasswordCorrect: false,
                    passwordError: res.data.msg,
                });
                break;
            }
            default:
            }
        });
    }

    handleLoginFailure(err) {
        this.setState({
            passwordError: err,
            isPasswordCorrect: false,
        });
    }

    handlePasswdChange({ value }) {
        this.setState({
            password: value,
            isPasswordCorrect: true,
            passwordError: '',
        });
    }

    handlePasswdBlur() {
        // 若有输入密码，则认为是正确的密码，显示status, 在ajax提交之后再处理密码实际正确性
        if (this.state.account) {
            this.setState({
                showPasswordStatus: true,
            });
            return;
        }

        this.setState({
            isPasswordCorrect: false,
            showPasswordStatus: true,
        });
    }

    handleAccountChange({ value }) {
        this.setState({
            account: value,
        });
    }

    handleKeyPress(e) {
        if (e.keyCode === 13) {
            this.handleSubmit();
        }
    }
    handleAccountBlur() {
        // 若有输入账号，则认为是正确的账号，显示status
        if (this.state.account) {
            this.setState({
                isAccountCorrect: true,
                showAccountStatus: true,
                accountError: '',
            });
            return;
        }

        this.setState({
            isAccountCorrect: false,
            showAccountStatus: true,
        });
    }

    render() {
        const clsPrefix = 'm-login';
        const {
            isAccountCorrect,
            isPasswordCorrect,
            accountError,
            passwordError,
            showAccountStatus,
            showPasswordStatus,
        } = this.state;
        const accountStatusCls = classNames(`${clsPrefix}--status`, {
            'icon-right-login': isAccountCorrect,
            [`${clsPrefix}--status__correct`]: isAccountCorrect,
            'icon-error-login': !isAccountCorrect,
            [`${clsPrefix}--status__error`]: !isAccountCorrect,
        });
        const passwordStatusCls = classNames(`${clsPrefix}--status`, {
            'icon-right-login': isPasswordCorrect,
            [`${clsPrefix}--status__correct`]: isPasswordCorrect,
            'icon-error-login': !isPasswordCorrect,
            [`${clsPrefix}--status__error`]: !isPasswordCorrect,
        });
        return (
            <div className={clsPrefix}>
                <div className={`${clsPrefix}--title`}>南瓜租房</div>
                <div className={`${clsPrefix}--desc`}>一个真实，高效的长租公寓平台</div>
                <form>
                    <div className={`${clsPrefix}--cell`}>
                        <div className={`${clsPrefix}--input-wrap`}>
                            <Input
                                className={`${clsPrefix}--input`}
                                type="text"
                                value={this.state.account}
                                placeholder="请输入账号/手机号"
                                name="account"
                                onKeyPress={this.handleKeyPress}
                                onChange={this.handleAccountChange}
                                onBlur={this.handleAccountBlur}
                                error={accountError !== ''}
                            />
                            {
                                showAccountStatus ?
                                    <div className={accountStatusCls} />
                                    : null
                            }
                        </div>
                        {
                            accountError ?
                                <div className={`${clsPrefix}--error`}>{accountError}</div>
                                : null
                        }
                    </div>
                    <div className={`${clsPrefix}--cell`}>
                        <div className={`${clsPrefix}--input-wrap`}>
                            <Input
                                className={`${clsPrefix}--input`}
                                type="password"
                                value={this.state.password}
                                placeholder="请输入密码"
                                name="password"
                                onKeyPress={this.handleKeyPress}
                                onChange={this.handlePasswdChange}
                                onBlur={this.handlePasswdBlur}
                                error={passwordError !== ''}
                            />
                            {
                                showPasswordStatus ?
                                    <div className={passwordStatusCls} />
                                    : null
                            }
                        </div>
                        {
                            passwordError ?
                                <div className={`${clsPrefix}--error`}>{passwordError}</div>
                                : null
                        }
                    </div>
                    <div
                        className={`${clsPrefix}--submit`}
                        role="button"
                        tabIndex={0}
                        onClick={this.handleSubmit}
                    >登录</div>
                </form>
            </div>
        );
    }
}

Login.defaultProps = {};

Login.propTypes = {};


export default connect()(Login);
