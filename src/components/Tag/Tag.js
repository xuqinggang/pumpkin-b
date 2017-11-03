import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { valueType } from '../../base/types';

const Tag = ({ name, value, erasable, status, onClick, children, className }) => {
    const handleClick = (e) => {
        e.stopPropagation();
        onClick({
            name,
            value,
        });
    };

    const clsPrefix = 'c-tag-normal';
    const cls = classNames(
        clsPrefix,
        {
            'c-tag': true,
            [className]: true,
            [`${clsPrefix}__${status}`]: true,
        },
    );

    return (
        <div
            role="presentation"
            onClick={handleClick}
            className={cls}
        >
            {children}
            {
                erasable ?
                    <div
                        role="presentation"
                        className={`${clsPrefix}--overlay`}
                        onClick={handleClick}
                    >删除</div>
                    : null
            }
        </div>
    );
};

Tag.defaultProps = {
    name: '',
    value: null,
    onClick: () => {},
    erasable: false, // 是否可删除
    status: 'normal',
    children: null,
    className: '',
};

Tag.propTypes = {
    name: PropTypes.string,
    value: valueType,
    onClick: PropTypes.func,
    erasable: PropTypes.bool,
    status: PropTypes.oneOf(['normal', 'disabled', 'active']),
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Tag;
