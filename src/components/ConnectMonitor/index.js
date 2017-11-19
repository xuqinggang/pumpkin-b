import React, { Component } from 'react';
import Monitor from './monitor';

const connectMonitor = (Target) => {
    class Connect extends Component {
        render() {
            const props = this.props;
            const extraProps = {
                listen: Monitor.listen,
                trigger: Monitor.trigger,
            };

            return (
                <Target {...props} {...extraProps} />
            );
        }
    }
    return Connect;
};

export default connectMonitor;
