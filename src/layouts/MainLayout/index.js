import React from 'react';
import PropTypes from 'prop-types';
import Header from 'modules/Header/index';
import Sidebar from 'modules/Sidebar/index';
import PageTitle from 'modules/PageTitle/index';
import './style.less';

const MainLayout = ({ title, children }) => (
    <div className="l-main">
        <PageTitle title={title} />
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
    title: '',
};

MainLayout.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
};

export default MainLayout;
