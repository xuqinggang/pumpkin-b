import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';

class Header extends Component {
    render() {
        return (
            <div className="c-header">
                <div className="c-header--login">
                    {
                        this.props.name
                        ? this.props.name
                        : '登录'
                    }
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

export default Header;
