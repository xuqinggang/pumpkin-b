import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { valueType } from '../../base/types';
import './style.less';

const Options = ({ selected, item, onClick, disabled }) => {
    const handleClick = (e) => {
        if (disabled) {
            return;
        }
        e.stopPropagation();
        onClick(item);
    };
    const clsPrefix = 'c-options';
    const cls = classNames(clsPrefix, {
        [`${clsPrefix}__selected`]: selected,
        [`${clsPrefix}__disabled`]: disabled,
    });
    return (
        <div
            role="presentation"
            onClick={handleClick}
            className={cls}
        >
            {item.text}
        </div>
    );
};

Options.defaultProps = {
    selected: false,
    disabled: false,
    onClick: () => {},
};

Options.propTypes = {
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    item: PropTypes.shape({
        value: valueType,
        text: PropTypes.string,
    }).isRequired,
};

export default Options;
