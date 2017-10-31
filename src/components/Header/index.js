import { Component } from 'react';
// import PropTypes from 'prop-types';
import './style.less';

class Header extends Component {
    render() {
        return (
            <div className="c-header">
                <div className="c-header--left">
                    左侧
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

// Header.defaultProps = {
    // children: PropTypes.node,
// };
//
// Header.propTypes = {
    // children: PropTypes.node,
// };
export default Header;
