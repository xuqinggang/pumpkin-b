import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import './style.less';

const MainLayout = ({ children }) => (
    <div className="l-main">
        <Header />
        <div>
            <Sidebar />
            <div className="l-main--content">
                {children}
            </div>
        </div>
    </div>
);

MainLayout.defaultProps = {
    children: null,
};

MainLayout.propTypes = {
    children: PropTypes.node,
};

export default MainLayout;
