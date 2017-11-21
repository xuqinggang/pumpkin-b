import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../BaseComponent/index';

class Drag extends BaseComponent {
    constructor(props) {
        super(props);

        this.autoBind('handleDrag', 'handleDragStart', 'handleDragEnd');
    }

    // eslint-disable-next-line class-methods-use-this
    handleDrag(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.onChange();
    }

    handleDragStart() {
        this.props.dragStart();
        this.props.onChange();
    }

    handleDragEnd(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.dragEnd();
        this.props.onChange();
    }

    render() {
        return (
            <div
                style={{ display: 'inline-block' }}
                onDrag={this.handleDrag}
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragEnd}
                draggable={this.props.draggable}
            >
                { this.props.children }
            </div>

        );
    }
}

const emptyFunc = () => {};
Drag.defaultProps = {
    name: '',
    draggable: true,
    dragStart: emptyFunc,
    dragEnd: emptyFunc,
    onChange: emptyFunc,
};

Drag.propTypes = {
    name: PropTypes.string,
    draggable: PropTypes.bool,
    dragStart: PropTypes.func,
    dragEnd: PropTypes.func,
    onChange: PropTypes.func,
};

export default Drag;
