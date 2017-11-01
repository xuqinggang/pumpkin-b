import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from '../BaseComponent/index';
import './style.less';

class Input extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };
        this.autoBind('handleChange', 'handleKeyPress', 'handleBlur', 'toFocus');
    }

    toFocus() {
        this.textInput.focus();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
        });
    }
    handleBlur() {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
        if (this.props.onChange) {
            this.props.onChange({ value: event.target.value, name: this.props.name });
        }
    }

    handleKeyPress(event) {
        if (this.props.onKeyPress) {
            this.props.onKeyPress(event);
        }
    }
    render() {
        const {
            type,
            disabled,
            placeholder,
            error,
            name,
            size,
        } = this.props;

        const clsPrefix = 'c-input';
        const cls = classNames(clsPrefix, {
            [this.props.className]: true,
            [`${clsPrefix}__disabled`]: disabled,
            [`${clsPrefix}__error`]: error,
            [`${clsPrefix}__${size}`]: true,
        });

        return (
            <input
                className={cls}
                type={type}
                name={name}
                value={this.state.value}
                placeholder={placeholder}
                disabled={disabled}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyPress}
                ref={(input) => { this.textInput = input; }}
            />
        );
    }
}

Input.defaultProps = {
    type: 'text',
    size: 'normal',
    disabled: false,
    error: false,
    name: '',
    placeholder: '',
    value: '',
    onBlur: null,
    onChange: null,
    onKeyPress: null,
    className: '',
};

Input.propTypes = {
    type: PropTypes.oneOf(['text', 'password']),
    size: PropTypes.oneOf(['normal', 'large']),
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    className: PropTypes.string,
};

export default Input;
