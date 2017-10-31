import { Component} from 'react';
import PropTypes from 'prop-types';
import './style.less';

class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="c-sidebar">
                我是sidebar
                {children}
            </div>
        );
    }
}

Sidebar.defaultProps = {
    children: null,
};

Sidebar.propTypes = {
    children: PropTypes.node,
};
export default Sidebar;
