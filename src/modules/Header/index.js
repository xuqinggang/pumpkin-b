import React from 'react';
import { connect } from 'react-redux';
import { logout } from 'modules/Passport/actions';
import { withRouter } from 'react-router-dom';
import BaseComponent from 'components/BaseComponent/index';
import PropTypes from 'prop-types';
import './style.less';

class Header extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleGoProfile', 'handleLoginOut');
    }
    handleGoProfile() {
        this.props.history.push('/profile');
    }
    handleLoginOut() {
        this.props.dispatch(logout());
        // this.props.history.push('/login');
    }
    render() {
        const clsPrefix = 'c-header';
        return (
            <div className={clsPrefix}>
                <div className={`${clsPrefix}--login icon-user`}>
                    <div className={`${clsPrefix}--board-wrap`}>
                        <div className={`${clsPrefix}--board`}>
                            <button
                                className={`${clsPrefix}--item`}
                                onClick={this.handleGoProfile}
                            >个人中心</button>
                            <button
                                className={`${clsPrefix}--item`}
                                onClick={this.handleLoginOut}
                            >退出登录</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Header.defaultProps = {
    name: '',
};

Header.propTypes = {
    name: PropTypes.string,
};

export default withRouter(connect()(Header));
