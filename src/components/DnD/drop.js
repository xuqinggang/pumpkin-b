import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../BaseComponent/index';

class Drop extends BaseComponent {
    constructor(props) {
        super(props);
        this.enterLeaveCounter = 0;
        this.autoBind('handleDragOver', 'handleDrop', 'handleDragEnter', 'handleDragLeave');
    }

    // eslint-disable-next-line class-methods-use-this
    handleDragOver(e) {
        e.stopPropagation();
        e.preventDefault();

        if (this.props.droppable) {
            e.dataTransfer.dropEffect = 'move';
        } else {
            e.dataTransfer.dropEffect = 'none';
        }

        this.props.dragOver();
    }

    handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.drop();
        this.props.onChange();
        this.enterLeaveCounter = this.enterLeaveCounter - 1;
    }

    handleDragEnter() {
        this.enterLeaveCounter = this.enterLeaveCounter + 1;

        if (this.enterLeaveCounter === 1) {
            this.props.dragEnter();
            this.props.onChange();
        }
    }

    handleDragLeave() {
        this.enterLeaveCounter = this.enterLeaveCounter - 1;

        if (this.enterLeaveCounter === 0) {
            this.props.dragLeave();
            this.props.onChange();
        }
    }

    render() {
        return (
            <div
                style={{ display: 'inline-block' }}
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
                onDragEnterCapture={this.handleDragEnter}
                onDragLeaveCapture={this.handleDragLeave}
            >
                { this.props.children }
            </div>

        );
    }
}

const emptyFunc = () => {};
Drop.defaultProps = {
    name: '',
    droppable: true,
    drop: emptyFunc,
    dragOver: emptyFunc,
    dragLeave: emptyFunc,
    dragEnter: emptyFunc,
    onChange: emptyFunc,
};

Drop.propTypes = {
    name: PropTypes.string,
    droppable: PropTypes.bool,
    drop: PropTypes.func,
    dragOver: PropTypes.func,
    dragLeave: PropTypes.func,
    dragEnter: PropTypes.func,
    onChange: PropTypes.func,
};

export default Drop;
