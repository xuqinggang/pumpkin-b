import PropTypes from 'prop-types';
import './style.less';

const Content = ({ children }) => (
    <div className="c-content">
        {children}
    </div>
);

Content.defaultProps = {
    children: null,
};

Content.propTypes = {
    children: PropTypes.node,
};

export default Content;
