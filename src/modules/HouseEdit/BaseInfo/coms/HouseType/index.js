import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import { FormItem } from 'components/Form/index';
import Select from 'components/Select/index';
import ConfirmDialog from 'components/ConfirmDialog/index';
import HouseTypeImage from '../HouseTypeImage/index';
import { setHouseType } from '../../actions';

const houseTypeMap = {
    room: {
        start: 1,
        suffix: '室',
        num: 9,
    },
    saloon: {
        start: 0,
        suffix: '厅',
        num: 10,
    },
    toilet: {
        start: 0,
        suffix: '卫',
        num: 10,
    },
};

const initHouseTypeOptions = (type) => {
    const opts = [];
    const typeInfo = houseTypeMap[type];
    for (let i = 0; i < typeInfo.num; i += 1) {
        opts.push({
            value: i + typeInfo.start,
            text: `${i + typeInfo.start}${typeInfo.suffix}`,
        });
    }
    return opts;
};

class HouseType extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            dialogHide: true,
        };
        this.autoBind(
            'handleSelectChange',
            'handleConfirm',
            'handleCancel',
        );
    }
    handleSelectChange({ name, select }) {
        const { lastHouseType } = this.props;
        if (lastHouseType[name] !== null && lastHouseType[name] !== select.value) {
            this.setState({
                dialogHide: false,
            });
            this.handleConfirm = () => {
                this.setState({
                    dialogHide: true,
                });
                this.props.dispatch(setHouseType(name, select.value));
            };
        } else {
            this.props.dispatch(setHouseType(name, select.value));
        }
    }
    handleCancel() {
        this.setState({
            dialogHide: true,
        });
    }
    render() {
        const clsPrefix = 'c-house-type';
        const {
            room,
            saloon,
            toilet,
        } = this.props.houseType;
        return (
            <FormItem
                label="房源户型"
                className={clsPrefix}
                layout="top"
            >
                <div>
                    <Select
                        name="room"
                        value={room}
                        className={`${clsPrefix}--select`}
                        onChange={this.handleSelectChange}
                        options={initHouseTypeOptions('room')}
                        disabled={!this.props.isCreate}
                    />
                    <Select
                        name="saloon"
                        value={saloon}
                        className={`${clsPrefix}--select`}
                        onChange={this.handleSelectChange}
                        options={initHouseTypeOptions('saloon')}
                        disabled={!this.props.isCreate}
                    />
                    <Select
                        name="toilet"
                        value={toilet}
                        onChange={this.handleSelectChange}
                        className={`${clsPrefix}--select`}
                        options={initHouseTypeOptions('toilet')}
                        disabled={!this.props.isCreate}
                    />
                </div>
                <HouseTypeImage />
                <ConfirmDialog
                    hide={this.state.dialogHide}
                    onConfirm={this.handleConfirm}
                    onCancel={this.handleCancel}
                >
                    <div>确定修改房源户型吗</div>
                    <div>信息将清空重新编辑</div>
                </ConfirmDialog>
            </FormItem>
        );
    }
}

export default connect(
    state => ({
        houseType: state.houseUpload.baseInfo.houseType,
        lastHouseType: state.houseUpload.commonInfo.houseType,
        isCreate: state.houseUpload.houseId === null,
    }),
)(HouseType);
