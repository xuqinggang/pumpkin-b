import { Component} from 'react';
import PropTypes from 'prop-types';
import './style.less';

class Header extends Component {
    render() {
        return (
            <div className="c-header">
                
            </div>
        );
    }
}

Header.defaultProps = {
    children: PropTypes.node,
    className: PropTypes.string,
};

Header.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};
export default Header;
