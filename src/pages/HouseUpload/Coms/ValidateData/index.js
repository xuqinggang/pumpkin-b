const itemError = ({ type = '', error = false, message = '' }) => ({
    type,
    error,
    message,
    sub: [],
});

const validateBaseInfo = {
    village: (data) => {
        const error = itemError({ type: 'village' });
        if (!data.text) {
            error.error = true;
            error.message = '小区名称不能为空';
        } else if (data.value === null) {
            error.error = true;
            error.message = '系统暂无该小区，请仔细核对名称或联系客服';
        }
        return error;
    },
    houseAddress: (data) => {
        const error = itemError({ type: 'houseAddress' });
        if (!data.buildNo) {
            error.error = true;
            error.sub.push(itemError({ type: 'buildNo', error: true }));
        }
        if (!data.houseNo) {
            error.error = true;
            error.sub.push(itemError({ type: 'houseNo', error: true }));
        }
        return error;
    },
    houseFloor: (data) => {
        const error = itemError({ type: 'houseFloor' });
        if (!data.curFloor) {
            error.error = true;
            error.sub.push(itemError({ type: 'curFloor', error: true }));
        }
        if (!data.totalFloor) {
            error.error = true;
            error.sub.push(itemError({ type: 'totalFloor', error: true }));
        }
        return error;
    },
    rentalType: (data) => {
        const error = itemError({ type: 'rentalType' });
        if (data === null) {
            error.error = true;
            error.message = '请选择出租方式';
        }
        return error;
    },
};

const validateRoomInfo = {
    priceInfo: () => {},
};

const validate = {
    baseInfo: {
        fn: validateBaseInfo,
        seq: ['village'],
    },
    roomInfo: {
        fn: validateRoomInfo,
        seq: ['priceInfo'],
    },
};

const validateData = (pageInfo, data) => {
    const seq = validate[pageInfo.type].seq;
    for (let i = 0; i < seq.length; i += 1) {
        const itemType = seq[i];
        const error = validate[pageInfo.type].fn[itemType](data[itemType]);
        if (error.error) {
            return error;
        }
    }
    return itemError();
};

export {
    validateBaseInfo,
    validateRoomInfo,
};

export default validateData;
