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
            'handleChange',
            'handleKeyPress',
        );

        this.state = {
            account: '',
            password: '',
            accountStatus: {
                type: 'UNSET',
                message: '',
            },
            passwordStatus: {
                type: 'UNSET',
                message: '',
            },
        };
    }

    handleSubmit() {
        const { account, password } = this.state;

        if (!account) {
            this.setState({
                accountStatus: {
                    type: 'ERROR',
                    message: '用户名不能为空',
                },
            });
            return;
        }

        if (!password) {
            this.setState({
                passwordStatus: {
                    type: 'ERROR',
                    message: '密码不能为空',
                },
            });
            return;
        }
        axios.post('/v1/user/login', {
            userName: account.trim(),
            password,
        })
        .then((res) => {
            switch (res.data.code) {
            case 200: {
                // 不用手动更改url
                this.props.dispatch(login());
                break;
            }
            case 1101: {
                this.setState({
                    accountStatus: {
                        type: 'ERROR',
                        message: res.data.msg,
                    },
                });
                break;
            }
            case 1102: {
                this.setState({
                    accountStatus: {
                        type: 'CORRECT',
                    },
                    passwordStatus: {
                        type: 'ERROR',
                        message: res.data.msg,
                    },
                });
                break;
            }
            default:
            }
        });
    }

    handlePasswdChange({ value }) {
        this.setState({
            password: value,

            passwordStatus: {
                type: 'UNSET',
            },
        });
    }

    handleAccountChange({ value }) {
        this.setState({
            account: value,

            accountStatus: {
                type: 'UNSET',
            },
        });
    }

    handleKeyPress(e) {
        if (e.keyCode === 13) {
            this.handleSubmit();
        }
    }
    render() {
        const clsPrefix = 'm-login';
        const {
            accountStatus,
            passwordStatus,
        } = this.state;
        const accountStatusCls = classNames(`${clsPrefix}--status`, {
            'icon-right-login': accountStatus.type === 'CORRECT',
            [`${clsPrefix}--status__correct`]: accountStatus.type === 'CORRECT',
            'icon-error-login': accountStatus.type === 'ERROR',
            [`${clsPrefix}--status__error`]: accountStatus.type === 'ERROR',
        });
        const passwordStatusCls = classNames(`${clsPrefix}--status`, {
            'icon-right-login': passwordStatus.type === 'CORRECT',
            [`${clsPrefix}--status__correct`]: passwordStatus.type === 'CORRECT',
            'icon-error-login': passwordStatus.type === 'ERROR',
            [`${clsPrefix}--status__error`]: passwordStatus.type === 'ERROR',
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
                                error={accountStatus.type === 'ERROR'}
                            />
                            {
                                accountStatus.type !== 'UNSET' ?
                                    <div className={accountStatusCls} />
                                    : null
                            }
                        </div>
                        {
                            accountStatus.type === 'ERROR' && accountStatus.message
                                ? <div className={`${clsPrefix}--error`}>{accountStatus.message}</div>
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
                                error={passwordStatus.type === 'ERROR'}
                            />
                            {
                                passwordStatus.type !== 'UNSET'
                                    ? <div className={passwordStatusCls} />
                                    : null
                            }
                        </div>
                        {
                            passwordStatus.type === 'ERROR' && passwordStatus.message
                                ? <div className={`${clsPrefix}--error`}>{passwordStatus.message}</div>
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
