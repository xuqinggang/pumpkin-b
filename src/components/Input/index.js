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

        this.maxTextLength = props.maxLengthLimit;
        this.autoBind('handleChange', 'handleKeyPress', 'handleBlur', 'toFocus', 'handleClick');
    }

    toFocus() {
        this.textInput.focus();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.uncontroled) return;
        this.setState({
            value: nextProps.value,
        });
    }
    handleBlur(event) {
        if (this.props.onBlur) {
            this.props.onBlur({ name: this.props.name, value: event.target.value });
        }
    }
    handleChange(event) {
        const parseValue = event.target.value.substr(0, this.maxTextLength);
        this.setState({ value: parseValue });
        if (this.props.onChange) {
            this.props.onChange({ value: parseValue, name: this.props.name });
        }
    }

    handleKeyPress(event) {
        if (this.props.onKeyPress) {
            this.props.onKeyPress(event);
        }
    }

    handleClick(event) {
        if (this.props.onClick) {
            this.props.onClick(event);
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
        const { className, style } = this.props;
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}__disabled`]: disabled,
            [`${clsPrefix}__error`]: error,
            [`${clsPrefix}__${size}`]: true,
        }, className);

        return (
            <input
                className={cls}
                style={style}
                type={type}
                name={name}
                value={this.state.value}
                placeholder={placeholder}
                disabled={disabled}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyPress}
                onClick={this.handleClick}
                ref={(input) => { this.textInput = input; }}
            />
        );
    }
}

Input.defaultProps = {
    uncontroled: false,
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
    onClick: null,
    className: '',
    maxLengthLimit: 100,
};

Input.propTypes = {
    uncontroled: PropTypes.bool,
    type: PropTypes.oneOf(['text', 'password', 'number']),
    size: PropTypes.oneOf(['normal', 'large']),
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    onClick: PropTypes.func,
    className: PropTypes.string,
    maxLengthLimit: PropTypes.number,
};

export default Input;
