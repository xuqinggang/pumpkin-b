import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.less';

const NoteWord = ({ children, first }) => {
    const clsPrefix = 'c-note-word';
    const cls = classNames(
        clsPrefix,
        {
            [`${clsPrefix}__first`]: first,
        },
    );
    return (
        <span className={cls}>{children}</span>
    );
};

NoteWord.propTypes = {
    children: PropTypes.node,
    first: PropTypes.bool,
};

NoteWord.defaultProps = {
    children: null,
    first: false,
};

export default NoteWord;
