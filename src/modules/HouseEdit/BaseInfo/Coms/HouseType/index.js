import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import { FormItem } from 'components/Form/index';
import Select from 'components/Select/index';
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
        this.autoBind('handleSelectChange');
    }
    handleSelectChange({ name, select }) {
        this.props.dispatch(setHouseType(name, select.value));
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
            >
                <div>
                    <Select
                        name="room"
                        value={room}
                        className={`${clsPrefix}--select`}
                        onChange={this.handleSelectChange}
                        options={initHouseTypeOptions('room')}
                    />
                    <Select
                        name="saloon"
                        value={saloon}
                        className={`${clsPrefix}--select`}
                        onChange={this.handleSelectChange}
                        options={initHouseTypeOptions('saloon')}
                    />
                    <Select
                        name="toilet"
                        value={toilet}
                        onChange={this.handleSelectChange}
                        className={`${clsPrefix}--select`}
                        options={initHouseTypeOptions('toilet')}
                    />
                </div>
            </FormItem>
        );
    }
}

export default connect(
    state => ({
        houseType: state.houseUpload.baseInfo.houseType,
    }),
)(HouseType);
