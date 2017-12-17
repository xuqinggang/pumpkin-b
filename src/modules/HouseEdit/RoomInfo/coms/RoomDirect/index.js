import { valueType } from 'base/types';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import ConnectContextToProps from 'components/ConnectContextToProps/index';
import Select from 'components/Select/index';
import directMap from '../../directMap';
import { setRoomDirect } from '../../actions';

class RoomDirect extends BaseComponent {
    constructor(props) {
        super(props);
        this.optionValues = [
            'EAST', 'SOUTH', 'WEST', 'NORTH',
            'NORTHEAST', 'SOUTHEAST', 'SOUTHWEST',
            'NORTHWEST', 'WESTEAST', 'NORTHSOUTH',
        ];
        this.autoBind('handleChange');
    }
    handleChange({ select }) {
        this.props.dispatch(setRoomDirect(this.props.roomId, { value: select.value }));
    }
    render() {
        return (
            <Select
                value={this.props.direct}
                onChange={this.handleChange}
                options={this.optionValues.map(directVal => ({
                    value: directVal,
                    text: directMap[directVal],
                }))}
            />
        );
    }
}

export default ConnectContextToProps(connect(
    (state, props) => {
        const roomInfo = state.houseUpload.roomInfo;
        const roomIds = roomInfo.map(item => (item.roomId));

        const direct = state.houseUpload.roomInfo[roomIds.indexOf(props.roomId)].direct;

        return {
            direct,
        };
    },
)(RoomDirect), {
    roomId: valueType,
});
