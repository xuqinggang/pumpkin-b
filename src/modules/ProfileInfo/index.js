import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent';
import Title from 'components/Title';
import Hint from 'components/Hint';
import { Row, Col } from 'components/Grid';
import ModifyPasswdModal from '../ModifyPasswdModal';
import ModifyPhoneModal from '../ModifyPhoneModal';
import './style.less';

class ProfileInfo extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            modifyPasswdHide: true,
            modifyPhoneHide: true,
            bindAction: 'bind',
        };

        this.autoBind(
            'handleModifyPhone',
            'handleModifyPasswd',
            'handleCancelModifyPasswd',
            'handleConfirmModifyPasswd',
            'handleCancelModifyPhone',
            'handleConfirmBindPhone',
            'handleConfirmUnbindPhone',
        );
    }

    handleModifyPhone() {
        this.setState({
            modifyPhoneHide: false,
        });
    }

    handleCancelModifyPhone() {
        this.setState({
            modifyPhoneHide: true,
        });
    }
    handleConfirmBindPhone() {
        this.setState({
            modifyPhoneHide: true,
        });
    }
    handleConfirmUnbindPhone() {
        this.setState({
            modifyPhoneHide: false,
            bindAction: 'bind',
        });
    }

    handleModifyPasswd() {
        this.setState({
            modifyPasswdHide: false,
        });
    }
    handleCancelModifyPasswd() {
        this.setState({
            modifyPasswdHide: true,
        });
    }

    handleConfirmModifyPasswd() {
        this.setState({
            modifyPasswdHide: true,
        });
    }

    render() {
        const { nick, phone } = this.props;
        return (
            <div className="m-profile-info">
                <Title>蛋壳公寓</Title>
                <Row>
                    <Col span={6}>您的账号: {nick}</Col>
                    <Col span={3}>
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={this.handleModifyPasswd}
                            className="m-profile-info--btn"
                        >
                            修改密码
                        </span>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>绑定手机号: {String(phone).replace(/(^.{3}).*(.{4}$)/, '$1****$2')}</Col>
                    <Col span={3}>
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={this.handleModifyPhone}
                            className="m-profile-info--btn"
                        >
                            修改手机号
                        </span>
                    </Col>
                    <Col span={6}>
                        <Hint>提示： 可用已绑定手机号登录</Hint>
                    </Col>
                </Row>
                {
                    this.state.modifyPasswdHide ? null :
                    <ModifyPasswdModal
                        hide={this.state.modifyPasswdHide}
                        onCancel={this.handleCancelModifyPasswd}
                        onConfirm={this.handleConfirmModifyPasswd}
                    />
                }
                <ModifyPhoneModal
                    hide={this.state.modifyPhoneHide}
                    onCancel={this.handleCancelModifyPhone}
                    onConfirmBind={this.handleConfirmBindPhone}
                    onConfirmUnbind={this.handleConfirmUnbindPhone}
                    type={this.state.bindAction}
                />
            </div>
        );
    }
}

ProfileInfo.defaultProps = {
    nick: '*********',
    phone: '188****8888',
};

ProfileInfo.propTypes = {
    nick: PropTypes.string,
    phone: PropTypes.string,
};

export default connect(
    (state) => {
        const userInfo = state.passport.userInfo;
        if (userInfo) {
            return {
                nick: userInfo.username,
                phone: userInfo.phone,
            };
        }
    },
)(ProfileInfo);
