import React from 'react';
import PropTypes from 'prop-types';
import Header from 'modules/Header/index';
import Sidebar from 'modules/Sidebar/index';
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
