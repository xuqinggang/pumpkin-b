import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import './style.less';

class MainLayout extends Component {
    // constructor(props) {
        // super(props);
    // }

    render() {
        const { children } = this.props;
        return (
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
    }
}

MainLayout.defaultProps = {
    children: PropTypes.node,
};

MainLayout.propTypes = {
    children: PropTypes.node,
};
export default MainLayout;
