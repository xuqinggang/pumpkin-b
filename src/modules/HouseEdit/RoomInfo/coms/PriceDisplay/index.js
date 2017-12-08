import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.less';

const PriceDisplay = ({ children, empty }) => {
    const clsPrefix = 'c-price-display';
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

PriceDisplay.defaultProps = {
    children: null,
    empty: false,
};

PriceDisplay.propTypes = {
    children: PropTypes.node,
    empty: PropTypes.bool,
};

export default PriceDisplay;
