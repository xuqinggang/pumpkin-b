import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';

class Header extends Component {
    render() {
        console.log('render');
        return (
            <div className="c-header">
                <div className="c-header--login">
                    登录
                </div>
            </div>
        );
    }
}

Header.defaultProps = {
    name: 'saber',
};

Header.propTypes = {
    name: PropTypes.string,
};

export default Header;
