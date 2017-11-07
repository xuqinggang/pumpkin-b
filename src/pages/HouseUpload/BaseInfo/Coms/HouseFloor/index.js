import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Input from 'components/Input/index';
import { FormItem } from 'components/Form/index';
import NoteWord from '../../../Coms/NoteWord/index';
import { setHouseFloor } from '../../actions';

class HouseFloor extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleChange');
    }
    handleChange({ name, value }) {
        const number = parseFloat(value);
        this.props.dispatch(setHouseFloor({ name, number }));
    }
    render() {
        const clsPrefix = 'c-house-floor';
        const { curFloor, totalFloor } = this.props.houseFloor;
        return (
            <FormItem
                label="房源楼层"
                className={clsPrefix}
            >
                <div>
                    <NoteWord first>第</NoteWord>
                    <Input
                        name="curFloor"
                        value={curFloor}
                        type="number"
                        onChange={this.handleChange}
                    />
                    <NoteWord>层／共</NoteWord>
                    <Input
                        name="totalFloor"
                        value={totalFloor}
                        type="number"
                        onChange={this.handleChange}
                    />
                    <NoteWord>层</NoteWord>
                </div>
            </FormItem>
        );
    }
}

export default connect(
    state => ({
        houseFloor: state.houseUpload.baseInfo.houseFloor,
    }),
)(HouseFloor);
