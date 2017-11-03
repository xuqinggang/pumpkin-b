import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TagPlaceholder = ({ active }) => {
    const clsPrefix = 'c-tag-placeholder';
    const cls = classNames(clsPrefix, {
        'c-tag': true,
        [`${clsPrefix}__active`]: active,
    });
    return (
        <div className={cls} />
    );
};

TagPlaceholder.defaultProps = {
    active: false,
};
TagPlaceholder.propTypes = {
    active: PropTypes.bool,
};

export default TagPlaceholder;
