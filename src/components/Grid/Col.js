import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.less';

class Col extends Component {
    render() {
        const prefixCls = 'c-col';
        const { style, offset, className } = this.props;
        const classname = classNames({
            [prefixCls]: true,
            [`${prefixCls}-${this.props.span}`]: true,
            [`${prefixCls}-offset-${this.props.offset}`]: !!offset,
        }, className);
        return (
            <div style={style} className={classname}>{this.props.children}</div>
        );
    }
}

Col.propTypes = {
    className: PropTypes.string,
    span: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired,
    ]),
    offset: PropTypes.number,
    style: PropTypes.shape({}),
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.node,
    ]),
};

Col.defaultProps = {
    className: '',
    children: null,
    span: 1,
    style: {},
    offset: 0,
};

export default Col;
