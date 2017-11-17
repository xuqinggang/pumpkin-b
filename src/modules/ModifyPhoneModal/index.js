import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent';
import Dialog from 'components/Dialog';
import Input from 'components/Input';
import Button from 'components/Button';
import { isPhoneNo } from 'utils';
import './style.less';

const VCODE_INTERVAL = 60;

class ModifyPhoneModal extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind(
            'handleConfirm',
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
            countDownSecond: VCODE_INTERVAL,
        };
        this.timer = null;
    }

    handleConfirm() {
        this.props.onConfirm();
    }

    handleCancel() {
        this.props.onCancel();
    }

    handleSendVcode() {
        this.countDown();
    }

    handlePhoneChange({ value }) {
        this.setState({
            phoneNumber: value,
        });
    }

    handleVcodeChagne({ value }) {
        this.setState({
            vcode: value,
        });
    }

    handlePhoneBlur({ value }) {
        if (!value) {
            this.setState({
                errorPhone: '手机号不能为空',
            });
            return;
        }

        if (!isPhoneNo(value)) {
            this.setState({
                errorPhone: '手机号不合法',
            });
            return;
        }

        this.setState({
            errorPhone: '',
        });
    }

    handleVcodeBlur({ value }) {
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

    render() {
        const clsPrefix = 'm-modify-phone-modal';
        const { errorPhone, errorVcode } = this.state;
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
            <Button
                key="confirm"
                type="confirm"
                onClick={this.handleConfirm}
                style={{
                    width: 116,
                    float: 'right',
                }}
            >确定</Button>,
        ];
        return (
            <Dialog
                title="修改手机号"
                actions={actions}
                hide={this.props.hide}
                onClose={this.handleCancel}
            >
                <div className={clsPrefix}>
                    <div className={`${clsPrefix}--cell`}>
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
                        <Button
                            type="confirm"
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
    onConfirm: defaultFunc,
    onCancel: defaultFunc,
};

ModifyPhoneModal.propTypes = {
    hide: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
};


export default ModifyPhoneModal;
