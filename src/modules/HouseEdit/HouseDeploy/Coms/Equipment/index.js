import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import { connectDragSource } from 'components/DnD/index';
import equipMap from './equipMap';
import './style.less';

class Equipment extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleDel');
    }
    handleDel() {
        if (this.props.onDel) {
            this.props.onDel();
        }
    }
    render() {
        const clsPrefix = 'c-equipment';

        const cls = classNames(clsPrefix, {
            [`${clsPrefix}__del`]: this.props.onDel,
        });
        return (
            <div className={cls}>
                <div className={`${clsPrefix}--drag`}>
                    <i className={`${clsPrefix}--indicator ${equipMap[this.props.value].className}`} />
                    <span className={`${clsPrefix}--text`}>
                        {
                            equipMap[this.props.value]
                            ? equipMap[this.props.value].text
                            : '未知类型家具'
                        }
                    </span>
                </div>
                {
                    this.props.onDel ?
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={this.handleDel}
                            className={`${clsPrefix}--del`}
                        >
                            <i className={`${clsPrefix}--del-icon`}>删除</i>
                        </div>
                        : null
                }
            </div>
        );
    }
}

Equipment.defaultProps = {
    value: 'BED',
    onDel: null,
    children: null,
};
Equipment.propTypes = {
    value: PropTypes.string,
    onDel: PropTypes.func,
    children: PropTypes.node,
};

export default connectDragSource(
    {
        canDrag(props) {
            return !props.onDel;
        },
        dragStart(props) {
            return props.value;
        },
    },
)(Equipment);
