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

// 错误提示
export const errorType = PropTypes.shape({
    error: PropTypes.bool,
    message: PropTypes.string,
});

export const rentUnitType = PropTypes.shape({
    id: valueType,
    status: PropTypes.oneOf(['UNFINISHED', 'FINISHED', 'PUBLISHED', 'OCCUPIED', 'OFFLINE']),
});

export const houseType = PropTypes.shape({
    id: valueType,
    block: PropTypes.shape({
        id: valueType,
        name: PropTypes.string,
    }),
    rentalType: PropTypes.oneOf(['WHOLE', 'SHARED']),
    rentUnits: PropTypes.arrayOf(rentUnitType),
    houseAddress: PropTypes.shape({
        buildNo: valueType,
        unitNo: valueType,
        houseNo: valueType,
    }),
    updateTime: PropTypes.number,
});
