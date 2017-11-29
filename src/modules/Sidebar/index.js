import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BaseComponent from 'components/BaseComponent/index';
import { pageUrl } from 'utils/index';
import './style.less';

class Sidebar extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curPageIndex: -1,
        };
        this.pages = [{
            url: 'house-manage',
            title: '房源管理',
        }, {
            url: 'house-upload',
            title: '房源上传',
        }, {
            url: 'profile',
            title: '个人中心',
        }];
    }
    handleTurnPage(index) {
        return () => {
            this.props.history.push({
                pathname: this.pages[index].url,
            });
        };
    }

    initPage(pathname) {
        this.setState({
            curPageIndex: this.pages.map(item => (pageUrl(item.url))).indexOf(pathname),
        });
    }
    componentDidMount() {
        const pathname = window.location.pathname;
        this.initPage(pathname);
    }

    render() {
        const clsPrefix = 'c-sidebar';
        return (
            <div className={clsPrefix}>
                <div className={`${clsPrefix}--header`}>
                    <img src={this.props.imgUrl} alt="头像" />
                </div>
                <div className={`${clsPrefix}--nav`}>
                    {
                        this.pages.map((item, index) => (
                            <div
                                key={index}
                                role="presentation"
                                onClick={this.handleTurnPage(index)}
                                className={`${clsPrefix}--nav-item`}
                            >
                                {
                                    this.state.curPageIndex === index
                                    ? <i className={`${clsPrefix}--nav-item-indicator`} />
                                    : null
                                }
                                <span className={`${clsPrefix}--nav-item-note`}>{item.title}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        imgUrl: state.passport.userInfo ? state.passport.userInfo.apartment.image : '',
    }),
)(withRouter(Sidebar));
