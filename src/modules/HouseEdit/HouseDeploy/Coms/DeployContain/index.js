import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import { connectDropTarget } from 'components/DnD/index';
import './style.less';

class DeployContain extends BaseComponent {
    render() {
        const clsPrefix = 'c-deploy-contain';
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}__isOver`]: this.props.isOver,
        });
        return (
            <div className={cls}>
                { this.props.children}
                { this.props.children.length === 0 ?
                    <span className={`${clsPrefix}--note`}>请拖拽配置至此处</span>
                    : null
                }
            </div>
        );
    }
}

DeployContain.propTypes = {
    isOver: PropTypes.bool,
    children: PropTypes.node,
};
DeployContain.defaultProps = {
    isOver: false,
    children: null,
};

export default connectDropTarget(
    {
        drop(props, monitor) {
            props.onDrop(monitor.getDragData());
        },
    },
    monitor => ({
        isOver: monitor.isOver(),
    }),
)(DeployContain);
