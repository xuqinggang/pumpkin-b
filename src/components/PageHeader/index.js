import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const PageHeader = ({ children, className }) => (
    <div className={`c-page-header ${className}`}>
        { children }
    </div>
);

PageHeader.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

PageHeader.defaultProps = {
    className: '',
    children: null,
};

export default PageHeader;
