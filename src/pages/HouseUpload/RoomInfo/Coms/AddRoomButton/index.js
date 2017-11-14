import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import './style.less';

class AddRoomButton extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleClick');
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        const clsPrefix = 'c-add-room-button';
        return (
            <div className={clsPrefix}>
                <button
                    className={`${clsPrefix}--button`}
                    onClick={this.handleClick}
                >
                    + 添加房间
                </button>
            </div>
        );
    }
}

AddRoomButton.defaultProps = {
    onClick: null,
};

AddRoomButton.propTypes = {
    onClick: PropTypes.func,
};

export default AddRoomButton;
