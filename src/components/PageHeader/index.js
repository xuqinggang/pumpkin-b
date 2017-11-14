import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const PageHeader = ({ children }) => (
    <div className="c-page-header">
        { children }
    </div>
);

PageHeader.propTypes = {
    children: PropTypes.node,
};

PageHeader.defaultProps = {
    children: null,
};

export default PageHeader;
