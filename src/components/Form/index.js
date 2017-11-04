import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from '../BaseComponent/index';
import './style.less';

class FormItem extends BaseComponent {
    render() {
        const clsPrefix = 'c-form-item';
        const cls = classNames(clsPrefix, {
            [this.props.className]: true,
            [`${clsPrefix}__${this.props.layout}`]: true,
            [`${clsPrefix}__${this.props.labelType}`]: true,
        });
        return (
            <div className={cls} style={this.props.style}>
                {this.props.label ? (<label>{this.props.label}</label>) : null }
                <div className={`${clsPrefix}--cell`}>
                    {this.props.children}
                    {
                        this.props.error.isError ?
                        (<div className={`${clsPrefix}--error`}>{this.props.error.message}</div>)
                        : null
                    }
                </div>
            </div>
        );
    }
}

FormItem.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
    labelType: PropTypes.oneOf(['primary', 'minor']),
    error: PropTypes.shape({
        isError: PropTypes.bool,
        message: PropTypes.string,
    }),
    layout: PropTypes.oneOf(['top', 'middle']),
    className: PropTypes.string,
    style: PropTypes.shape({}),
};

FormItem.defaultProps = {
    children: null,
    label: '',
    labelType: 'primary',
    error: {
        isError: false,
        message: '',
    },
    layout: 'middle',
    className: '',
    style: {},
};

class Form extends BaseComponent {
    render() {
        const clsPrefix = 'c-form';
        return (
            <div className={
                classNames(clsPrefix, {
                    [this.props.className]: true,
                    [`${clsPrefix}__${this.props.layout}`]: true,
                })}
            >
                {this.props.children}
            </div>
        );
    }
}

Form.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    layout: PropTypes.oneOf(['horizontal', 'vertical']),
};

Form.defaultProps = {
    children: null,
    className: '',
    layout: 'vertical',
};

export {
    FormItem,
};

export default Form;
