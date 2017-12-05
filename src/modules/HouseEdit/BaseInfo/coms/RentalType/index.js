import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import { FormItem } from 'components/Form/index';
import RadioGroup from 'components/Radio/index';
import ConfirmDialog from 'components/ConfirmDialog/index';
import { switchRentalType } from '../../actions';
import { hideValidateError } from '../../../actions';

class RentalType extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                error: false,
                message: '',
            },
            dialogHide: true,
        };
        this.autoBind(
            'handleChange',
            'handleConfirm',
            'handleCancel',
        );
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.error.error !== this.props.error.error && nextProps.error.error) {
            this.setState({
                error: {
                    ...nextProps.error,
                },
            });
        }
    }
    handleChange({ value }) {
        this.setState({
            error: {
                ...this.state.error,
                error: false,
            },
        });
        this.props.dispatch(hideValidateError({ pageType: 'baseInfo' }));

        if (this.props.lastRentalType !== null && this.props.lastRentalType !== value) {
            this.setState({
                dialogHide: false,
            });
            this.handleConfirm = () => {
                this.setState({
                    dialogHide: true,
                });
                this.props.dispatch(switchRentalType(value));
            };
        } else {
            this.props.dispatch(switchRentalType(value));
        }
    }
    handleCancel() {
        this.setState({
            dialogHide: true,
        });
    }
    render() {
        const clsPrefix = 'c-rental-type';
        return (
            <FormItem
                label="出租方式"
                className={clsPrefix}
                error={this.state.error}
            >
                <RadioGroup
                    layout="horizontal"
                    options={[
                        {
                            value: 0,
                            text: '整租',
                        },
                        {
                            value: 1,
                            text: '合租',
                        },
                    ]}
                    value={this.props.value}
                    onChange={this.handleChange}
                    disabled={!this.props.isCreate}
                />
                <ConfirmDialog
                    hide={this.state.dialogHide}
                    onConfirm={this.handleConfirm}
                    onCancel={this.handleCancel}
                >
                    <div>确定修改出租方式吗</div>
                    <div>信息将清空重新编辑</div>
                </ConfirmDialog>
            </FormItem>
        );
    }
}

export default connect(
    (state) => {
        let error = {
            error: false,
            message: '',
        };
        const baseInfoError = state.houseUpload.validateError.baseInfo;
        if (baseInfoError && baseInfoError.type === 'rentalType') {
            error = baseInfoError;
        }
        return {
            error,
            isCreate: state.houseUpload.houseId === null,
            value: state.houseUpload.baseInfo.rentalType,
            lastRentalType: state.houseUpload.commonInfo.rentalType,
        };
    },
)(RentalType);
