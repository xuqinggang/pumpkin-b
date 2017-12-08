import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.less';

const DepositDisplay = ({ children, empty }) => {
    const clsPrefix = 'c-deposit-display';
    const cls = classNames(clsPrefix, {
        [`${clsPrefix}__empty`]: empty,
    });
    return (
        <div className={cls}>
            {
                empty
                ? '-'
                : children
            }
        </div>
    );
};

DepositDisplay.defaultProps = {
    children: null,
    empty: false,
};

DepositDisplay.propTypes = {
    children: PropTypes.node,
    empty: PropTypes.bool,
};

export default DepositDisplay;
