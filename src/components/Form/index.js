import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from '../BaseComponent/index';
import './style.less';

class FormItem extends BaseComponent {
    render() {
        const clsPrefix = 'c-form-item';
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}__${this.props.labelType}`]: true,
        });
        return (
            <div className={cls}>
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
};

FormItem.defaultProps = {
    children: null,
    label: '',
    labelType: 'minor',
    error: {
        isError: false,
        message: '',
    },
};

class Form extends BaseComponent {
    render() {
        return (
            <div className={
                classNames('c-form', {
                    [this.props.className]: true,
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
};

Form.defaultProps = {
    children: null,
    className: '',
};

export {
    Form,
    FormItem,
};

export default Form;
