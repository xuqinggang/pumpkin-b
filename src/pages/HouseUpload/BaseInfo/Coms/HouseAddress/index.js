import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Input from 'components/Input/index';
import { FormItem } from 'components/Form/index';
import NoteWord from '../../../Coms/NoteWord/index';
import { setHouseFloor } from '../../actions';

class HouseAddress extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleChange');
    }
    handleChange({ name, value }) {
        this.props.dispatch(setHouseFloor({ name, value }));
    }
    render() {
        const clsPrefix = 'c-house-address';
        const { buildNo, unitNo, houseNo } = this.props.houseAddress;
        return (
            <FormItem
                label="房源地址"
                className={clsPrefix}
            >
                <div>
                    <Input
                        name="buildNo"
                        value={buildNo}
                        onChange={this.handleChange}

                    />
                    <NoteWord>栋</NoteWord>
                    <Input
                        name="unitNo"
                        value={unitNo}
                        onChange={this.handleChange}
                    />
                    <NoteWord>单元</NoteWord>
                    <Input
                        name="houseNo"
                        value={houseNo}
                        onChange={this.handleChange}
                    />
                    <NoteWord>号</NoteWord>
                </div>
            </FormItem>
        );
    }
}

export default connect(
    state => ({
        houseAddress: state.houseUpload.baseInfo.houseAddress,
    }),
)(HouseAddress);
