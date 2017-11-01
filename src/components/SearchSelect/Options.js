import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { valueType } from './type';

const Options = ({ selected, item, onClick }) => {
    const handleClick = (e) => {
        e.stopPropagation();
        onClick(item);
    };
    const clsPrefix = 'c-search-select--options';
    return (
        <div
            role="presentation"
            onClick={handleClick}
            className={classNames(clsPrefix, { [`${clsPrefix}__selected`]: selected })}
        >
            {item.text}
        </div>
    );
};

Options.defaultProps = {
    selected: false,
    onClick: () => {},
};

Options.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func,
    item: PropTypes.shape({
        value: valueType,
        text: PropTypes.string,
    }).isRequired,
};

export default Options;
