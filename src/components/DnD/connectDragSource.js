import React from 'react';
import Drag from './drag';
import BaseComponent from '../BaseComponent/index';
import monitorShape from './monitorShape';

const connectDragSource = (lifeCycle, collect) => (DragSource) => {
    const defaultLifeCycle = {
        canDrag: () => (true),
        dragStart: () => {},
        dragEnd: () => {},
    };
    const {
        canDrag,
        dragStart,
        dragEnd,
    } = {
        ...defaultLifeCycle,
        ...lifeCycle,
    };

    class Connect extends BaseComponent {
        constructor(props, context) {
            super(props, context);
            this.autoBind(
                'handleDragStart',
                'handleDragEnd',
                'handleDragChange',
            );
            this.state = {
                draggable: canDrag(props),
                extraProps: {},
            };

            this.DnDMonitor = context['DnD-monitor'];

            this.dragMonitorData = {
                isDragging: false,
                dragData: null,
                dropData: null,
            };

            this.monitor = {};
            this.monitor.isDragging = () => (this.dragMonitorData.isDragging);
            this.monitor.getDragData = () => (this.dragMonitorData.dragData);
            this.monitor.getDropResult = () => (this.dragMonitorData.dropData);
        }
        componentWillReceiveProps(nextProps) {
            this.setState({
                draggable: canDrag(nextProps),
            });
        }
        componentDidMount() {
            // 给所有的drag实例传递数据
            this.DnDMonitor.listen('dnd-drop', (dropData) => {
                const dragMonitorData = this.dragMonitorData;
                this.dragMonitorData = {
                    ...dragMonitorData,

                    // dragData: null,
                    // didDrop: true,
                    // isDragging: false,
                    ...(dragMonitorData.isDragging ? { didDrop: true } : {}),
                    dropData,
                };
            });
        }
        handleDragStart() {
            const dragData = dragStart(this.props, this.monitor);
            this.DnDMonitor.trigger('dnd-dragStart', dragData);

            this.dragMonitorData = {
                ...this.dropMonitorData,
                isDragging: true,
            };
        }
        handleDragEnd() {
            this.dragMonitorData = {
                ...this.dropMonitorData,
                dragData: null,
                isDragging: false,
            };
            dragEnd(this.props, this.monitor);
        }
        handleDragChange() {
            if (!collect) return;
            const extraProps = collect(this.monitor);
            if (extraProps) {
                this.setState({
                    extraProps,
                });
            }
        }
        render() {
            const props = this.props;
            return (
                <Drag
                    dragStart={this.handleDragStart}
                    dragEnd={this.handleDragEnd}
                    onChange={this.handleDragChange}
                    draggable={this.state.draggable}
                >
                    <DragSource {...props} {...this.state.extraProps} />
                </Drag>
            );
        }
    }
    Connect.contextTypes = {
        'DnD-monitor': monitorShape,
    };
    return Connect;
};

export default connectDragSource;
