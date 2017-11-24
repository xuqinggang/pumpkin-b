import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from '../BaseComponent/index';
import { valueType, optionListType } from '../../base/types';
import EventBlackHole from '../EventBlackHole/index';
import Options from '../Options/index';
import './style.less';

const setSelect = (value, options, defaultText) => {
    const defaultSelect = {
        value: null,
        text: defaultText,
    };
    let select = {
        ...defaultSelect,
    };
    const isSelected = options.some((item) => {
        select = {
            ...item,
        };

        return item.value === value;
    });
    return isSelected ? select : defaultSelect;
};

class Select extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            select: setSelect(props.value, props.options, props.defaultText),
        };
        this.autoBind('handleClick', 'handleSelect', 'handleBlur');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            select: setSelect(nextProps.value, nextProps.options, nextProps.defaultText),
        });
    }

    handleClick() {
        if (this.props.disabled) {
            return;
        }
        this.wrp.focus();
        this.setState({
            expand: !this.state.expand,
        });
    }

    handleBlur(e) {
        if (e.relatedTarget && this.wrp.contains(e.relatedTarget)) {
            e.preventDefault();
            return;
        }
        this.setState({
            expand: false,
        });
    }

    handleSelect(item) {
        this.setState({
            select: item,
            expand: false,
        });
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                select: item,
            });
        }
    }

    render() {
        const clsPrefix = 'c-select';
        const cls = classNames(clsPrefix, {
            [this.props.className]: true,
            [`${clsPrefix}__disabled`]: this.props.disabled,
        });

        return (
            <div
                ref={this.storeRef('wrp')}
                className={cls}
                role="button"
                tabIndex={0}
                onClick={this.handleClick}
                onBlur={this.handleBlur}
            >
                <div className={`${clsPrefix}--selected`}>
                    <span>
                        {
                            this.state.select.blank
                            ? this.props.defaultText
                            : this.state.select.text
                        }
                    </span>
                    <i className={`${clsPrefix}--selected--icon icon-pull-down`} />
                </div>
                <EventBlackHole captureEvents={['click']}>
                    <div
                        className={
                            classNames(`${clsPrefix}--popover`, {
                                [`${clsPrefix}--popover__hide`]: !this.state.expand,
                            })}
                    >
                        {this.props.options.map((option, index) => (
                            <Options
                                key={`option-${index}`}
                                item={option}
                                selected={this.state.select.value === option.value}
                                onClick={this.handleSelect}
                            />
                        ))}
                    </div>
                </EventBlackHole>
            </div>
        );
    }
}

Select.defaultProps = {
    defaultText: '请选择',
    value: null,
    name: '',
    disabled: false,
    options: [],
    onChange: null,
    className: '',
};

Select.propTypes = {
    defaultText: PropTypes.string,
    name: PropTypes.string,
    value: valueType,
    disabled: PropTypes.bool,
    options: optionListType,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

export default Select;
