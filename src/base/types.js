import PropTypes from 'prop-types';

export const valueType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
]);

export const optionListType = PropTypes.arrayOf(PropTypes.shape({
    value: valueType,
    text: PropTypes.string,
}));

// 组件尺寸
export const uiSizeType = PropTypes.oneOf(['tiny', 'normal', 'small', 'large', 'huge']);
