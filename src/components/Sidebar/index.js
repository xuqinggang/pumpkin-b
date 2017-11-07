import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import BaseComponent from 'components/BaseComponent/index';
import './style.less';

class Sidebar extends BaseComponent {
    constructor(props) {
        super(props);
        this.pageType = [];
        this.pagesUrl = ['house-upload', 'house-manage', 'profile'];
        this.pagesName = ['房源上传', '房源管理', '个人中心'];
    }
    handleTurnPage(index) {
        return () => {
            this.props.history.push({
                pathname: this.pagesUrl[index],
            });
        };
    }

    render() {
        const clsPrefix = 'c-sidebar';
        return (
            <div className={clsPrefix}>
                <div className={`${clsPrefix}--header`}>
                    <img src="http://img0.imgtn.bdimg.com/it/u=2761922488,4233734238&fm=27&gp=0.jpg" alt="头像" />
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
                                <i />
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
