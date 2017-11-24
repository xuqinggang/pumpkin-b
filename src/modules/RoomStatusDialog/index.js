import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import ConfirmDialog from 'components/ConfirmDialog/index';
import { FormItem } from 'components/Form/index';
import RadioGroup from 'components/Radio/index';
import './style.less';

class RoomStatusDialog extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            error: {
                error: false,
                message: '',
            },
        };
        this.roomStatusChangeNote = {
            PUBLISHED: '确定发布此房间吗？',
            OFFLINE: '确定下架此房间吗？',
            DELETE: '确定删除此房间吗？',
        };
        this.autoBind('handleConfirm', 'handleChange', 'handleCancel');
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.hide !== nextProps.hide) {
            this.setState({
                value: null,
                error: {
                    error: false,
                    message: '',
                },
            });
        }
    }
    handleCancel() {
        this.props.onCancel();
    }
    handleConfirm() {
        const {
            value,
        } = this.state;
        if (this.props.type === 'OCCUPIED' && value === null) {
            this.setState({
                error: {
                    error: true,
                    message: '请选择租客性别',
                },
            });
            return;
        }
        this.props.onConfirm({ type: this.props.type, value });
    }
    handleChange({ value }) {
        this.setState({
            value,
            error: {
                error: false,
                message: '',
            },
        });
    }
    render() {
        const clsPrefix = 'm-room-status-dialog';
        return (
            <ConfirmDialog
                onConfirm={this.handleConfirm}
                onCancel={this.handleCancel}
                hide={this.props.hide}
                className={clsPrefix}
            >
                {
                    this.props.type === 'OCCUPIED' ?
                        <FormItem
                            className={`${clsPrefix}--occupied`}
                            error={this.state.error}
                            labelType="minor"
                        >
                            <div className={`${clsPrefix}--note`}>确定租客入住该房间？</div>
                            <div>
                                <span className={`${clsPrefix}--radio-title`}>租客性别</span>
                                <RadioGroup
                                    className={`${clsPrefix}--radio`}
                                    layout="horizontal"
                                    options={[
                                        {
                                            value: 'FEMALE',
                                            text: '女',
                                        },
                                        {
                                            value: 'MALE',
                                            text: '男',
                                        },
                                    ]}
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </FormItem>
                        :
                        <span>{this.roomStatusChangeNote[this.props.type]}</span>
                }
            </ConfirmDialog>
        );
    }
}

RoomStatusDialog.defaultProps = {
    hide: true,
    type: 'DELETE',
    onConfirm: () => {},
    onCancel: () => {},
};
RoomStatusDialog.propTypes = {
    hide: PropTypes.bool,
    type: PropTypes.oneOf(['PUBLISHED', 'OCCUPIED', 'OFFLINE', 'DELETE']),
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
};

export default RoomStatusDialog;

