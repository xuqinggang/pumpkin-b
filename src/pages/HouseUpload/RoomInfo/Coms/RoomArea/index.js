import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import ConnectContextToProps from 'components/ConnectContextToProps/index';
import { FormItem } from 'components/Form/index';
import Input from 'components/Input/index';
import NoteWord from '../../../Coms/NoteWord/index';
import { setRoomArea } from '../../actions';
import './style.less';

class RoomArea extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleChange');
    }
    handleChange({ value }) {
        this.props.dispatch(setRoomArea(this.props.index, { value }));
    }
    render() {
        const clsPrefix = 'c-room-area';
        return (
            <div className={clsPrefix}>
                <FormItem
                    label="房间面积"
                >
                    <Input
                        value={this.props.roomArea}
                        onChange={this.handleChange}
                    />
                    <NoteWord>平米</NoteWord>
                </FormItem>
            </div>
        );
    }
}

export default ConnectContextToProps(connect(
    (state, props) => {
        const roomArea = state.houseUpload.roomInfo[props.index].roomArea;
        return {
            roomArea,
        };
    },
)(RoomArea), {
    index: PropTypes.number,
});
