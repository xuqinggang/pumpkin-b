import React, { Component } from 'react';

const ConnectContextToProps = (Target, contextTypes) => {
    class Connect extends Component {
        render() {
            const props = this.props;
            const extraProps = this.context;

            return (
                <Target {...props} {...extraProps} />
            );
        }
    }
    Connect.contextTypes = contextTypes;
    return Connect;
};

export default ConnectContextToProps;
