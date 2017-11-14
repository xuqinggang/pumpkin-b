import React from 'react';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import './style.less';

const MainLayout = content => (
    () => (
        <div className="l-main">
            <Header />
            <div>
                <Sidebar />
                <div className="l-main--content">
                    {React.createElement(content)}
                </div>
            </div>
        </div>
    )
);

export default MainLayout;
