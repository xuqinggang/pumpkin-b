import { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.less';

class Row extends Component {
    render() {
        const prefixCls = 'c-row';
        const { gutter, children, className } = this.props;
        const classname = classNames({
            [prefixCls]: true,
        }, className);
        const cols = gutter ? Children.map(children, col => (
            cloneElement(col, {
                style: {
                    paddingLeft: gutter / 2,
                    paddingRight: gutter / 2,
                    ...col.props.style,
                },
            })
        )) : children;
        return (
            <div className={classname}>{cols}</div>
        );
    }
}

Row.propTypes = {
    gutter: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
};

Row.defaultProps = {
    className: '',
    gutter: 0,
    children: [],
};

export default Row;
