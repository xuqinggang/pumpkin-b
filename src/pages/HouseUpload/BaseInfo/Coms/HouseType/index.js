import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import { FormItem } from 'components/Form/index';
import Select from 'components/Select/index';
import { setHouseType } from '../../actions';

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
                        options={[{
                            value: 0,
                            text: '0室',
                        }, {
                            value: 1,
                            text: '1室',
                        }, {
                            value: 2,
                            text: '2室',
                        }]}
                    />
                    <Select
                        name="saloon"
                        value={saloon}
                        className={`${clsPrefix}--select`}
                        options={[{
                            value: 0,
                            text: '0厅',
                        }, {
                            value: 1,
                            text: '1厅',
                        }, {
                            value: 2,
                            text: '2厅',
                        }]}
                    />
                    <Select
                        name="toilet"
                        value={toilet}
                        className={`${clsPrefix}--select`}
                        options={[{
                            value: 0,
                            text: '0卫',
                        }, {
                            value: 1,
                            text: '1卫',
                        }, {
                            value: 2,
                            text: '2卫',
                        }]}
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
