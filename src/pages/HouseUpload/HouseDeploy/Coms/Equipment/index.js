import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import { connectDragSource } from 'components/DnD/index';
import './style.less';

const equipmentMap = {
    bed: {
        text: '床',
    },
};

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
                    <i className={`${clsPrefix}--indicator`} />
                    <span className={`${clsPrefix}--text`}>{equipmentMap[this.props.type].text}</span>
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
    type: 'bed',
    onDel: null,
};
Equipment.propTypes = {
    type: PropTypes.oneOf(['bed']),
    onDel: PropTypes.func,
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
