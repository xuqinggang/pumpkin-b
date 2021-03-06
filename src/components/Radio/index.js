import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from '../BaseComponent/index';
import { optionListType, valueType } from '../../base/types';
import './style.less';

export class Radio extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleClick');
    }

    handleClick() {
        if (this.props.onClick && !this.props.disabled) {
            this.props.onClick(this.props);
        }
    }

    render() {
        const clsPrefix = 'c-radio';
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}__checked`]: this.props.checked,
            [`${clsPrefix}__disabled`]: this.props.disabled,
        });

        return (
            <div
                className={cls}
                onClick={this.handleClick}
                role="button"
                tabIndex={0}
            >
                <span className={`${clsPrefix}--indicator`} />
                <span className={`${clsPrefix}--children`}>{this.props.children}</span>
            </div>
        );
    }
}

Radio.defaultProps = {
    disabled: false,
    name: '',
    checked: false,
    onClick: null,
};

Radio.propTypes = {
    disabled: PropTypes.bool,
    name: PropTypes.string,
    checked: PropTypes.bool,
    onClick: PropTypes.func,
};


class RadioGroup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };
        this.autoBind('handleClick');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
        });
    }

    handleClick({ value }) {
        if (this.props.disabled) {
            return;
        }
        this.setState({
            value,
        });
        if (this.props.onChange) {
            this.props.onChange({ value, name: this.props.name });
        }
    }

    render() {
        const clsPrefix = 'c-radio-group';
        const className = classNames(clsPrefix, {
            [this.props.className]: true,
            [`${clsPrefix}__disabled`]: this.props.disabled,
            [`${clsPrefix}__layout-${this.props.layout}`]: true,
        });

        return (
            <div className={className}>
                {this.props.options.map(
                    option => (
                        <Radio
                            key={`radio-${option.value}`}
                            value={option.value}
                            onClick={this.handleClick}
                            checked={option.value === this.state.value}
                            disabled={this.props.disabled}
                        >
                            {option.text}
                        </Radio>
                    ),
                )}
            </div>
        );
    }
}

RadioGroup.defaultProps = {
    disabled: false,
    name: '',
    value: null,
    options: [],
    onChange: null,
    layout: 'vertical',
};

RadioGroup.propTypes = {
    disabled: PropTypes.bool,
    name: PropTypes.string,
    value: valueType,
    options: optionListType,
    onChange: PropTypes.func,
    layout: PropTypes.oneOf(['vertical', 'horizontal']),
};

export default RadioGroup;
