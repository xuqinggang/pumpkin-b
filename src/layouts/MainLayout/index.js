import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import Header from 'modules/Header/index';
import Sidebar from 'modules/Sidebar/index';
import PageTitle from 'modules/PageTitle/index';
import Message from 'modules/Message/index';
import './style.less';

class MainLayout extends BaseComponent {
    componentDidMount() {
        window.scroll(0, 0);
    }
    render() {
        return (
            <div className="l-main">
                <PageTitle title={this.props.title} />
                <Header />
                <div>
                    <Sidebar />
                    <div className="l-main--content">
                        {this.props.children}
                    </div>
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
