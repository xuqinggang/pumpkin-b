import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const isServer = typeof window === 'undefined';
class Portal extends Component {
    constructor(props) {
        super(props);
        if (isServer) return;
        this.container = document.createElement('div');
    }

    componentDidMount() {
        if (isServer) return;
        document.body.appendChild(this.container);
    }

    componentWillUnmount() {
        if (isServer) return;
        document.body.removeChild(this.container);
    }

    render() {
        if (isServer) return <div />;
        return createPortal(
            this.props.children,
            this.container,
        );
    }
}

Portal.defaultProps = {
    children: null,
};

Portal.propTypes = {
    children: PropTypes.node,
};

export default Portal;
