import { Component, Children } from 'react';
import PropTypes from 'prop-types';
import monitorShape from './monitorShape';

class DnDMonitor {
    constructor() {
        this.events = {};
        this.listen = this.listen.bind(this);
        this.trigger = this.trigger.bind(this);
    }
    listen(key, fn) {
        if (!typeof key === 'string' || !typeof fn === 'function') {
            throw Error('监听事件参数错误');
        }
        if (!this.events[key]) {
            // 事件注册
            this.events[key] = [];
        }
        this.events[key].push(fn);
    }
    trigger(...args) {
        const key = args[0];
        const extraArgs = [].slice.call(args, 1);

        (this.events[key] || []).forEach((item) => {
            item(...extraArgs);
        });
    }
}


class DnDContext extends Component {
    constructor(props, context) {
        super(props, context);
        this.monitor = new DnDMonitor();
    }
    getChildContext() {
        return {
            'DnD-monitor': this.monitor,
        };
    }
    // componentDidMount() {
    //     // drag 事件
    //     this.monitor['DnD-listen']('DnD-DragStart', (dragData) => {
    //         this.DnDDataTransfer = {
    //             ...this.DnDDataTransfer,
    //             isDragging: true,
    //             dragData,
    //         };
    //     });
    //     this.monitor['DnD-listen']('DnD-DragEnd', () => {
    //         this.DnDDataTransfer = {
    //             ...this.DnDDataTransfer,
    //             isDragging: false,
    //             dragData: null,
    //         };
    //     });
    //
    //     // drop 事件
    //     this.monitor['DnD-listen']('DnD-Drop', (dropData) => {
    //         this.DnDDataTransfer = {
    //             ...this.DnDDataTransfer,
    //             dropData,
    //         };
    //     });
    // }
    render() {
        return Children.only(this.props.children);
    }
}

DnDContext.propTypes = {
    children: PropTypes.element.isRequired,
};

DnDContext.childContextTypes = {
    'DnD-monitor': monitorShape,
};

export default DnDContext;
