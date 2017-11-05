import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import ConnectContextToProps from 'components/ConnectContextToProps/index';
import Textarea from 'components/Textarea/index';
import PropTypes from 'prop-types';
import { changeRoomBrief } from '../../actions';
import './style.less';

const validValue = (value) => {
    const maxLength = 500;
    return value.substr(0, maxLength);
};

class RoomBrief extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.brief,
        };
        this.autoBind('handleChange');
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.brief,
        });
    }
    handleChange({ value }) {
        const val = validValue(value);
        this.setState({ value: val });
        this.props.dispatch(changeRoomBrief(this.props.index, { value: val }));
    }
    render() {
        const clsPrefix = 'c-house-intro';
        return (
            <div className={clsPrefix}>
                <Textarea
                    value={this.state.value}
                    onChange={this.handleChange}
                    error={this.props.error}
                    placeholder="请输入房源介绍（最多500字）"
                    className={`${clsPrefix}--textarea`}
                />
            </div>
        );
    }
}

RoomBrief.propTypes = {
    name: PropTypes.string,
};

RoomBrief.defaultProps = {
    name: '',
};

export default ConnectContextToProps(connect(
    (state, props) => {
        const brief = state.houseUpload.roomInfo[props.index].brief;
        return {
            brief,
        };
    },
)(RoomBrief), {
    index: PropTypes.number,
});
