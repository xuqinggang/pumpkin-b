import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.less';

function Hint({ className, style, children, type }) {
    const clsPrefix = 'c-hint';
    const cls = classNames(clsPrefix, `${clsPrefix}__${type}`, className);
    return (
        <div className={cls} style={style}>
            {children}
        </div>
    );
}

Hint.defaultProps = {
    type: 'normal',
    className: '',
    style: {},
    children: null,
};

Hint.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
    children: PropTypes.node,
};

export default Hint;
