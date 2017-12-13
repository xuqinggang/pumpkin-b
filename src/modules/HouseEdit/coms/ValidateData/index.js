import { isNaturalNum, isFloatNum, isPhoneNo } from 'utils';

const itemError = ({ type = '', error = false, message = '' } = {}) => ({
    type,
    error,
    message,
    sub: {},
});

const isDataInput = (data) => {
    const baseInfo = data.baseInfo;
    return !!(
        baseInfo.rentalType ||
        baseInfo.houseTypeImgUrl ||
        (baseInfo.houseTypeImgUrl) ||
        (baseInfo.houseFloor.curFloor || baseInfo.houseFloor.totalFloor) ||
        (baseInfo.village.value || baseInfo.village.text) ||
        (baseInfo.houseType.room !== 1 ||
            baseInfo.houseType.saloon || baseInfo.houseType.toilet) ||
        (baseInfo.houseAddress.buildNo ||
            baseInfo.houseAddress.unitNo || baseInfo.houseAddress.houseNo) ||
        (baseInfo.keeperInfo.name ||
            baseInfo.keeperInfo.phone || baseInfo.keeperInfo.imgUrl)
    );
};

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
        error.sub = {
            buildNo: itemError({ type: 'buildNo', error: false }),
            unitNo: itemError({ type: 'unitNo', error: false }),
            houseNo: itemError({ type: 'houseNo', error: false }),
        };

        if (!isNaturalNum(data.buildNo)) {
            error.sub.buildNo.error = true;
        } else if (Number(data.buildNo) < 1 || Number(data.buildNo) > 99) {
            error.sub.buildNo.error = true;
        }
        if (!isNaturalNum(data.unitNo)) {
            error.sub.unitNo.error = true;
        } else if (Number(data.unitNo) < 1 || Number(data.unitNo) > 99) {
            error.sub.unitNo.error = true;
        }
        if (!isNaturalNum(data.houseNo)) {
            error.sub.houseNo.error = true;
        } else if (Number(data.houseNo) < 1 || Number(data.houseNo) > 9999) {
            error.sub.houseNo.error = true;
        }

        // 不校验单元Number
        error.error = error.sub.buildNo.error || error.sub.houseNo.error;
        return error;
    },
    houseFloor: (data) => {
        const error = itemError({ type: 'houseFloor' });
        error.sub = {
            curFloor: itemError({ type: 'curFloor', error: false }),
            totalFloor: itemError({ type: 'totalFloor', error: false }),
        };
        if (!isNaturalNum(data.curFloor)) {
            error.sub.curFloor.error = true;
        } else if (Number(data.curFloor) < 1 || Number(data.curFloor) > 99) {
            error.sub.curFloor.error = true;
        }
        if (!isNaturalNum(data.totalFloor)) {
            error.sub.totalFloor.error = true;
        } else if (Number(data.totalFloor) < 1 || Number(data.totalFloor) > 99) {
            error.sub.totalFloor.error = true;
        }

        error.error = error.sub.curFloor.error || error.sub.totalFloor.error;
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
    keeperInfo: (data) => {
        const error = itemError({ type: 'keeperInfo' });
        error.sub = {
            name: itemError({ type: 'name', error: false }),
            phone: itemError({ type: 'phone', error: false }),
        };
        if (!data.name) {
            error.sub.name = {
                ...error.sub.name,
                error: true,
                message: '请填写管家姓名',
            };
        }
        if (!data.phone) {
            error.sub.phone = {
                ...error.sub.phone,
                error: true,
                message: '请填写管家电话',
                for: 'EMPTY',
            };
        } else if (!isPhoneNo(data.phone)) {
            error.sub.phone = {
                ...error.sub.phone,
                error: true,
                message: '请输入正确的电话号码',
                for: 'MISTAKE',
            };
        }

        error.error = error.sub.name.error || error.sub.phone.error;
        return error;
    },
};

const validateRoomInfo = {
    roomArea: (data) => {
        const error = itemError({ type: 'roomArea' });
        if (data === '') {
            error.error = true;
            error.message = '房间面积不能为空';
        } else if (!isFloatNum(data)) {
            error.error = true;
            error.message = '请输入有效数字';
        } else if (Number(data) < 0.1 || Number(data) > 999.9) {
            error.error = true;
            error.message = '房间面积超过限制';
        }
        return error;
    },
    priceInfo: (data, { priceType } = {}) => {
        const errorMessageMap = {
            month: '月付价',
            season: '季付价',
            halfYear: '半年价',
            year: '年付价',
        };
        const validateItemPrice = (itemData, type) => {
            const error = itemError({ type: 'season' });
            error.sub.price = itemError({ type: 'price' });
            error.sub.deposit = itemError({ type: 'deposit' });
            if (!itemData.price) {
                error.sub.price = itemError({ type: 'price', error: true, message: `请填写${errorMessageMap[type]}` });
            } else if (!isFloatNum(itemData.price)) {
                error.sub.price = itemError({ type: 'price', error: true, message: `${errorMessageMap[type]}不是有效数字` });
            }
            if (!itemData.deposit) {
                error.sub.deposit = itemError({ type: 'deposit', error: true, message: '请填写押金' });
            } else if (!isFloatNum(itemData.deposit)) {
                error.sub.deposit = itemError({ type: 'deposit', error: true, message: '押金不是有效数字' });
            }
            error.error = error.sub.price.error || error.sub.deposit.error;
            error.message = error.sub.price.message || error.sub.deposit.message;
            return error;
        };

        // 暴露给其他组件使用，校验单条数据
        if (priceType) {
            // 如果存在指定的priceType，则data对应该priceType
            return validateItemPrice(data, priceType);
        }

        const error = itemError({ type: 'priceInfo' });

        ['month', 'season', 'halfYear', 'year'].forEach((itemPriceType) => {
            if (data[itemPriceType].checked) {
                // 最终错误只校验checked数据的租金
                const subItemError = validateItemPrice(data[itemPriceType], itemPriceType);
                if (subItemError.error) {
                    error.error = true;
                    error.sub[itemPriceType] = subItemError;
                }
            }
        });

        return error;
    },
    roomTag: (data) => {
        const error = itemError({ type: 'roomTag' });
        if (data.active.length === 0) {
            error.error = true;
        }
        return error;
    },
    brief: (data) => {
        const error = itemError({ type: 'brief' });
        if (!data) {
            error.error = true;
        }
        return error;
    },
};

const chamberError = (data, chamberType, dataType) => {
    // validateType is oneOf 'picUrls' and 'deploys'
    let error = itemError({ type: chamberType });
    const chamberErrorMessageMap = {
        picUrls: '请至少上传一张图片',
        deploys: '配置不能为空',
    };
    data.some((item, index) => {
        if (item[dataType].length === 0) {
            error = {
                ...error,
                error: true,
                chamberIndex: index,
                message: chamberErrorMessageMap[dataType],
            };
            return true;
        }
        return false;
    });
    return error;
};

const validateChamberInfo = (dataType) => {
    const validatePageInfo = {};
    const chamberType = ['rooms', 'saloons', 'toilets', 'kitchens'];
    chamberType.forEach((item) => {
        validatePageInfo[item] = data => (chamberError(data, item, dataType));
    });
    return validatePageInfo;
};

const validate = {
    baseInfo: {
        fn: validateBaseInfo,
        seq: ['village', 'houseAddress', 'houseFloor', 'rentalType', 'keeperInfo'],
    },
    roomInfo: {
        fn: validateRoomInfo,
        seq: ['roomArea', 'priceInfo', 'roomTag', 'brief'],
    },
    housePics: {
        fn: validateChamberInfo('picUrls'),
        seq: ['rooms', 'saloons', 'toilets'],
    },
    houseDeploy: {
        fn: validateChamberInfo('deploys'),
        seq: ['rooms', 'toilets'],
    },
};

const validateData = (pageInfo, data) => {
    const seq = validate[pageInfo.type].seq;
    for (let i = 0; i < seq.length; i += 1) {
        const itemType = seq[i];
        const error = validate[pageInfo.type].fn[itemType](data[itemType]);
        if (error.error) {
            error.pageType = pageInfo.type;
            return error;
        }
    }
    return itemError();
};

export {
    validateBaseInfo,
    validateRoomInfo,
    itemError,
    isDataInput,
};

export default validateData;
