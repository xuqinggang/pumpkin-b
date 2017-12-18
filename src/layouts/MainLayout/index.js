import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import Header from 'modules/Header/index';
import Sidebar from 'modules/Sidebar/index';
import PageTitle from 'modules/PageTitle/index';
import Message from 'modules/Message/index';
import './style.less';

class MainLayout extends BaseComponent {
    render() {
        return (
            <div className="l-main">
                <PageTitle title={this.props.title} />
                <Sidebar />
                <div className="l-main--content">
                    <Header />
                    {this.props.children}
                </div>
                <Message />
            </div>
        );
    }
}

MainLayout.defaultProps = {
    children: null,
    title: '',
};

MainLayout.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
};

export default MainLayout;
