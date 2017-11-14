import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import Input from 'components/Input/index';

class TagAdd extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            editing: false,
        };
        this.autoBind('handleClick', 'handleBlur', 'handleKeyDown', 'handleChange');
    }
    handleClick() {
        this.setState({
            editing: true,
        });
        this.input.toFocus();
    }
    handleAdd() {
        if (!this.state.value) return;
        this.props.onAdd({
            name: this.props.name,
            value: this.state.value,
        });
        this.setState({
            value: '',
            editing: false,
        });
    }
    handleChange({ value }) {
        this.setState({
            value,
        });
    }
    handleBlur() {
        this.handleAdd();
    }
    handleKeyDown(e) {
        if (e.keyCode === 13 || e.keyCode === 27) {
            this.handleAdd();
        }
    }
    render() {
        const clsPrefix = 'c-tag-add';
        const cls = classNames(clsPrefix, {
            'c-tag': true,
            [`${clsPrefix}__active`]: this.state.editing,
        });
        return (
            <div className={cls}>
                <Input
                    value={this.state.value}
                    ref={this.storeRef('input')}
                    onBlur={this.handleBlur}
                    onKeyDown={this.handleKeyDown}
                    className={`${clsPrefix}--input`}
                    onChange={this.handleChange}
                />
                <div
                    role="presentation"
                    onClick={this.handleClick}
                    className={`${clsPrefix}--note`}
                >
                    <span>+ 标签</span>
                </div>
            </div>
        );
    }
}

TagAdd.defaultProps = {
    name: '',
    onAdd: () => {},
};

TagAdd.propTypes = {
    name: PropTypes.string,
    onAdd: PropTypes.func,
};

export default TagAdd;
