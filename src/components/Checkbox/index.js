import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from '../BaseComponent/index';
import { uiSizeType } from '../../base/types';
import './style.less';

class Checkbox extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked,
            partialChecked: props.partialChecked,
        };
        this.autoBind('handleClick');
    }
    compoentWillReceiveProps(nextProps) {
        this.setState({
            checked: nextProps.checked,
            partialChecked: nextProps.partialChecked,
        });
    }

    handleClick() {
        if (this.props.disabled) {
            return;
        }
        const checked = !this.state.checked;
        this.setState({
            checked,
            partialChecked: false,
        });
        if (this.props.onChange) {
            this.props.onChange({
                checked,
                name: this.props.name,
            });
        }
    }

    render() {
        const clsPrefix = 'c-checkbox';
        const cls = classNames(clsPrefix, {
            [this.props.className]: true,
            [`${clsPrefix}__checked`]: this.state.checked,
            [`${clsPrefix}__disabled`]: this.props.disabled,
            [`${clsPrefix}__partial-checked`]: this.state.partialChecked,
        });

        return (
            <div
                className={cls}
                disabled={this.props.disabled}
                onClick={this.handleClick}
                role="button"
                tabIndex={0}
            >
                <span className={`${clsPrefix}--indicator`} />
                <span className={`${clsPrefix}--label`}>{this.props.children}</span>
            </div>
        );
    }
}

Checkbox.defaultProps = {
    size: 'normal',
    disabled: false,
    name: '',
    checked: false,
    partialChecked: false,
    onChange: null,
    className: '',
};

Checkbox.propTypes = {
    size: uiSizeType,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    checked: PropTypes.bool,
    partialChecked: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

export default Checkbox;
