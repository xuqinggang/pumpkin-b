import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import errorNote from 'base/errorNote';
import BaseComponent from 'components/BaseComponent';
import Dialog from 'components/Dialog';
import Input from 'components/Input';
import Button from 'components/Button';
import { isPhoneNo } from 'utils';
import { passportStatus } from 'modules/Passport/actions';
import { showMessage } from 'modules/Message/actions';
import './style.less';

const VCODE_INTERVAL = 60;

class ModifyPhoneModal extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind(
            'handleConfirmBind',
            'handleConfirmUnbind',
            'handleCancel',
            'handleSendVcode',
            'countDown',
            'handlePhoneChange',
            'handleVcodeChange',
            'handlePhoneBlur',
            'handleVcodeBlur',
        );

        this.state = {
            phoneNumber: '',
            vcode: '',
            canSend: true,
            errorPhone: '',
            errorVcode: '',
            vcodeLoad: false,
            sendLoad: false,
            countDownSecond: VCODE_INTERVAL,
        };
        this.timer = null;
    }

    handleConfirmBind() {
        const { phoneNumber, vcode } = this.state;

        this.setState({
            sendLoad: true,
        });
        if (isPhoneNo(phoneNumber) && vcode) {
            axios.put('/v1/user/phone', {
                phoneNumber,
                verificationCode: vcode,
            })
            .then((res) => {
                if (res.data.code === 200) {
                    this.props.dispatch(passportStatus());
                    this.props.dispatch(showMessage('绑定手机号成功'));
                    this.props.onConfirmBind();
                } else if ([14002, 14003].indexOf(res.data.code) !== -1) {
                    this.setState({
                        errorVcode: res.data.msg,
                    });
                } else if ([1104, 14007, 14009].indexOf(res.data.code) !== -1) {
                    this.setState({
                        errorPhone: res.data.msg,
                    });
                } else {
                    this.props.dispatch(showMessage(res.data.msg || errorNote.OTHER_SUCCESS_ERR));
                }
            })
            .catch((e) => {
                this.props.dispatch(showMessage(e.message));
            })
            .then(() => {
                this.setState({
                    sendLoad: false,
                });
            });
        }
    }

    handleConfirmUnbind() {
        this.props.onConfirmUnbind();
    }

    handleCancel() {
        this.props.onCancel();
    }

    handleSendVcode() {
        // 判断当前手机号是否合法
        if (this.handleVilidatePhone(this.state.phoneNumber)) return;

        // ajax 发送验证码
        this.setState({
            vcodeLoad: true,
        });
        axios.post('/v1/user/phone/verificationCode', {
            phoneNumber: this.state.phoneNumber,
        })
        .then((res) => {
            if (res.data.code !== 200) {
                this.setState({
                    errorPhone: res.data.msg,
                });
            }
            this.countDown();
        })
        .catch(() => {})
        .then(() => {
            this.setState({
                vcodeLoad: false,
            });
        });
    }

    handlePhoneChange({ value }) {
        // 输入手机号
        this.setState({
            phoneNumber: value,
            errorPhone: '',
        });
    }

    handleVcodeChange({ value }) {
        // 输入验证码
        this.setState({
            vcode: value,
            errorVcode: '',
        });
    }

    handleVilidatePhone(phoneNo) {
        let error = false;
        let message = '';
        if (!phoneNo) {
            error = true;
            message = '手机号不能为空';
        } else if (!isPhoneNo(phoneNo)) {
            error = true;
            message = '手机号不合法';
        }
        this.setState({
            errorPhone: message,
        });
        return error;
    }

    handlePhoneBlur({ value }) {
        // 手机输入框blur
        this.handleVilidatePhone(value);
    }

    handleVcodeBlur({ value }) {
        // 验证码输入框blur
        if (!value) {
            this.setState({
                errorVcode: '请输入验证码',
            });
            return;
        }

        this.setState({
            errorVcode: '',
        });
    }

    countDown() {
        // 发送验证码倒计时
        this.timer = setInterval(() => {
            if (this.state.countDownSecond === 0) {
                clearInterval(this.timer);
                this.setState({
                    canSend: true,
                    countDownSecond: VCODE_INTERVAL,
                });
            } else {
                this.setState({
                    canSend: false,
                    countDownSecond: this.state.countDownSecond - 1,
                });
            }
        }, 1000);

        this.setState({
            canSend: false,
            countDownSecond: this.state.countDownSecond - 1,
        });
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const clsPrefix = 'm-modify-phone-modal';
        const { errorPhone, errorVcode } = this.state;
        const { hide, type } = this.props;
        const inputStyle = {
            width: '100%',
        };

        const actions = [
            <Button
                key="cancel"
                onClick={this.handleCancel}
                style={{
                    width: 116,
                }}
            >取消</Button>,
            type === 'bind' ?
                <Button
                    key="confirm"
                    type="confirm"
                    onClick={this.handleConfirmBind}
                    style={{
                        width: 116,
                        float: 'right',
                    }}
                    disabled={this.state.sendLoad}
                >绑定</Button>
                : <Button
                    key="confirm"
                    type="confirm"
                    onClick={this.handleConfirmUnbind}
                    style={{
                        width: 116,
                        float: 'right',
                    }}
                >下一步</Button>,
        ];
        return (
            <Dialog
                title="修改手机号"
                actions={actions}
                hide={hide}
                onClose={this.handleCancel}
            >
                <div className={clsPrefix}>
                    <div className={`${clsPrefix}--cell`}>
                        {
                            type === 'bind' ?
                                <Input
                                    type="text"
                                    name="phone"
                                    value={this.state.phoneNumber}
                                    style={{
                                        width: 142,
                                    }}
                                    placeholder="请输入手机号"
                                    onChange={this.handlePhoneChange}
                                    onBlur={this.handlePhoneBlur}
                                />
                                : <div className={`${clsPrefix}--txt`}>1888888888888</div>
                        }
                        <Button
                            type="confirm"
                            disabled={!this.state.canSend || this.state.vcodeLoad}
                            onClick={this.handleSendVcode}
                            style={{
                                width: 102,
                                float: 'right',
                                padding: 0,
                            }}
                        >{ this.state.canSend ? '获取验证码' : `剩余${this.state.countDownSecond}秒` }</Button>
                        <div className={`${clsPrefix}--tip`}>{errorPhone}</div>
                    </div>
                    <div className={`${clsPrefix}--cell`}>
                        <Input
                            type="text"
                            name="vcode"
                            value={this.state.vcode}
                            style={inputStyle}
                            placeholder="请输入验证码"
                            onChange={this.handleVcodeChange}
                            onBlur={this.handleVcodeBlur}
                        />
                        <div className={`${clsPrefix}--tip`}>{errorVcode}</div>
                    </div>
                </div>
            </Dialog>
        );
    }
}

const defaultFunc = () => {};

ModifyPhoneModal.defaultProps = {
    hide: true,
    onConfirmBind: defaultFunc,
    onConfirmUnbind: defaultFunc,
    onCancel: defaultFunc,
    type: 'bind',
};

ModifyPhoneModal.propTypes = {
    hide: PropTypes.bool,
    onConfirmBind: PropTypes.func,
    onConfirmUnbind: PropTypes.func,
    onCancel: PropTypes.func,
    type: PropTypes.string,
};


export default connect()(ModifyPhoneModal);
