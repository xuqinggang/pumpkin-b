import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.less';

class Header extends Component {
    render() {
        console.log('render');
        return (
            <div className="c-header">
                <div className="c-header--left">
                    {this.props.name}
                </div>
                <div className="c-header--center">
                    中间
                </div>
                <div className="c-header--right">
                    右侧
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
export default connect(
    state => ({ name: state.name }),
)(Header);
