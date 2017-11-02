import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import { uiSizeType } from '../../base/types';
import './style.less';

class TextArea extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };
        this.autoBind('handleChange', 'handleKeyPress');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
        });
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
            placeholder,
        } = this.props;
        const {
            value,
        } = this.state;
        const error = this.props.error;

        const cls = classNames('c-textarea', {
            error,
            [this.props.size]: true,
        });

        return (
            <textarea
                className={cls}
                placeholder={placeholder}
                value={value}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyPress}
            />
        );
    }
}

TextArea.defaultProps = {
    maxLength: 0,
    placeholder: '',
    value: '',
    name: '',
    onChange: null,
    onKeyPress: null,
    error: false,
    size: 'normal',
};

TextArea.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    error: PropTypes.bool,
    size: uiSizeType,
};

export default TextArea;
