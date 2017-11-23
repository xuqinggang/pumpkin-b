import React from 'react';
// import PropTypes from 'prop-types';
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
        this.pagesUrl = ['house-upload', 'house-manage', 'profile'];
        this.pagesName = ['房源上传', '房态管理', '个人中心'];
    }
    handleTurnPage(index) {
        return () => {
            this.props.history.push({
                pathname: this.pagesUrl[index],
            });
        };
    }

    initPage(pathname) {
        this.setState({
            curPageIndex: this.pagesUrl.map(item => (pageUrl(item))).indexOf(pathname),
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
                    <img src="" alt="头像" />
                </div>
                <div className={`${clsPrefix}--nav`}>
                    {
                        this.pagesName.map((item, index) => (
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
                                <span className={`${clsPrefix}--nav-item-note`}>{item}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(Sidebar);
