import PropTypes from 'prop-types';
import axios from 'axios';
import BaseComponent from 'components/BaseComponent';
import Dialog from 'components/Dialog';
import Input from 'components/Input';
import Button from 'components/Button';
import { getNewState, passwdNameMap } from './helper';
import './style.less';

class ModifyPasswdModal extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleConfirm', 'handleCancel', 'handleBlur', 'handleChange');
        this.state = {
            errorOld: '',
            errorNewFirst: '',
            errorNewSecond: '',
            passwdOld: '',
            passwdNewFirst: '',
            passwdNewSecond: '',
        };
    }

    handleConfirm() {
        this.checkPasswd();
    }

    checkPasswd() {
        // 检查旧密码是否合法, 并设置新密码
        const { passwdOld: oldPassword, passwdNewFirst: newPassword } = this.state;

        axios.put('/v1/user/password', {
            params: {
                oldPassword,
                newPassword,
            },
        })
            .then((res) => {
                if (res.code === 200) {
                    alert('成功');
                } else {
                    alert('失败');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleCancel() {
        this.props.onCancel();
    }

    handleBlur({ name, value }) {
        const newState = getNewState(value, name, this.state);

        this.setState({
            ...newState,
        });
    }

    handleChange({ name, value }) {
        const changedKey = passwdNameMap[name];
        this.setState({
            [changedKey]: value,
        });
    }

    render() {
        const clsPrefix = 'm-modify-passwd-modal';
        const { errorOld, errorNewFirst, errorNewSecond } = this.state;
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
                title="修改密码"
                actions={actions}
                hide={this.props.hide}
                onClose={this.handleCancel}
            >
                <div className={clsPrefix}>
                    <div className={`${clsPrefix}--cell`}>
                        <Input
                            name="old"
                            type="password"
                            style={inputStyle}
                            value={this.state.passwdOld}
                            placeholder="请输入旧密码"
                            onBlur={this.handleBlur}
                            onChange={this.handleChagne}
                        />
                        <div className={`${clsPrefix}--tip`}>{errorOld}</div>
                    </div>
                    <div className={`${clsPrefix}--cell`}>
                        <Input
                            name="newFirst"
                            type="password"
                            value={this.state.passwdNewFirst}
                            style={inputStyle}
                            placeholder="请输入新密码"
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                        />
                        <div className={`${clsPrefix}--tip`}>{errorNewFirst}</div>
                    </div>
                    <div className={`${clsPrefix}--cell`}>
                        <Input
                            name="newSecond"
                            type="password"
                            style={inputStyle}
                            value={this.state.passwdNewSecond}
                            placeholder="请再次输入新密码"
                            onBlur={this.handleBlur}
                            onChange={this.handleChagne}
                        />
                        <div className={`${clsPrefix}--tip`}>{errorNewSecond}</div>
                    </div>
                </div>
            </Dialog>
        );
    }
}

const defaultFunc = () => {};

ModifyPasswdModal.defaultProps = {
    hide: true,
    onConfirm: defaultFunc,
    onCancel: defaultFunc,
};

ModifyPasswdModal.propTypes = {
    hide: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
};


export default ModifyPasswdModal;
