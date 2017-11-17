import React from 'react';
import PropTypes from 'prop-types';
import './style.less'

function Title({ children }) {
    return (
        <div className="c-title">
            {children}
        </div>
    );
}

Title.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Title;
