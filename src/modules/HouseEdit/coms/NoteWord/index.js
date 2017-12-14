import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.less';

const NoteWord = ({ children, first, className }) => {
    const clsPrefix = 'c-note-word';
    const cls = classNames(
        clsPrefix,
        {
            [`${clsPrefix}__first`]: first,
        },
    );
    return (
        <span className={`${cls} ${className}`}>{children}</span>
    );
};

NoteWord.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    first: PropTypes.bool,
};

NoteWord.defaultProps = {
    className: '',
    children: null,
    first: false,
};

export default NoteWord;
