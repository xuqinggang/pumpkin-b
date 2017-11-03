import React from 'react';
import PropTypes from 'prop-types';
import { upperFirst } from '../../base/utils';

const eventHandler = (e) => {
    e.stopPropagation();
};

const EventBlackHole = ({ captureEvents, className, children }) => {
    const props = {
        className,
    };

    captureEvents.forEach((name) => {
        props[`on${upperFirst(name)}`] = eventHandler;
    });

    return React.createElement('div', props, children);
};

EventBlackHole.propTypes = {
    className: PropTypes.string,
    captureEvents: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node,
};

EventBlackHole.defaultProps = {
    className: '',
    captureEvents: [],
    children: null,
};

export default EventBlackHole;
