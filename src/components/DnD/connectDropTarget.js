import React from 'react';
import Drop from './drop';
import BaseComponent from '../BaseComponent/index';
import monitorShape from './monitorShape';

const connectDropTarget = (lifeCycle, collect) => (DropTarget) => {
    const defaultLifeCycle = {
        canDrop: () => (true),
        dragOver: () => {},
        drop: () => {},
    };
    const {
        canDrop,
        dragOver,
        drop,
    } = {
        ...defaultLifeCycle,
        ...lifeCycle,
    };

    class Connect extends BaseComponent {
        constructor(props, context) {
            super(props, context);
            this.state = {
                droppable: canDrop(props),
                extraProps: {},
            };

            this.DnDMonitor = context['DnD-monitor'];

            this.autoBind(
                'handleDropChange',
                'handleDrop',
                'handleDragEnter',
                'handleDragLeave',
                'handleDragOver',
            );

            this.dropMonitorData = {
                isDragging: false,
                isOver: false,
                dragData: null,
                dropData: null,
                didDrop: false,
            };

            this.monitor = {};
            this.monitor.isOver = () => (this.dropMonitorData.isOver);
            this.monitor.getDragData = () => (this.dropMonitorData.dragData);
            this.monitor.getDropResult = () => (this.dropMonitorData.dropData);
            this.monitor.didDrop = () => (this.dropMonitorData.didDrop);
        }
        componentWillReceiveProps(nextProps) {
            this.setState({
                droppable: canDrop(nextProps),
            });
        }
        componentDidMount() {
            // 给所有的drop实例传递数据
            this.DnDMonitor.listen('dnd-dragStart', (dragData) => {
                this.dropMonitorData = {
                    ...this.dropMonitorData,
                    isDragging: true,
                    dragData,
                };
            });
            this.DnDMonitor.listen('dnd-dragEnd', () => {
                this.dropMonitorData = {
                    ...this.dropMonitorData,
                    isDragging: false,
                    dragData: null,
                };
            });
        }
        handleDropChange() {
            const extraProps = collect(this.monitor) || {};
            this.setState({
                extraProps,
            });
        }
        handleDragEnter() {
            this.dropMonitorData = {
                ...this.dropMonitorData,
                isOver: true,
            };
        }
        handleDragLeave() {
            this.dropMonitorData = {
                ...this.dropMonitorData,
                isOver: false,
            };
        }
        handleDragOver() {
            dragOver(this.props, this.monitor);
        }
        handleDrop() {
            const dropData = drop(this.props, this.monitor);
            this.dropMonitorData = {
                ...this.dropMonitorData,
                didDrop: true,
                dragData: null,
                isOver: false,
                dropData,
            };
            this.DnDMonitor.trigger('dnd-drop', dropData);
        }
        render() {
            const props = this.props;
            const { extraProps } = this.state;
            return (
                <Drop
                    dragOver={this.handleDragOver}
                    drop={this.handleDrop}
                    onChange={this.handleDropChange}
                    dragEnter={this.handleDragEnter}
                    dragLeave={this.handleDragLeave}
                    droppable={this.state.droppable}
                >
                    <DropTarget {...props} {...extraProps} />
                </Drop>
            );
        }
    }
    Connect.contextTypes = {
        'DnD-monitor': monitorShape,
    };
    return Connect;
};

export default connectDropTarget;
