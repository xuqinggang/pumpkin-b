import PropTypes from 'prop-types';

const monitorShape = PropTypes.shape({
    listen: PropTypes.func.isRequired,
    trigger: PropTypes.func.isRequired,
});

export default monitorShape;
