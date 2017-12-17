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

        if (data.buildNo === '') {
            error.sub.buildNo.error = true;
            error.sub.buildNo.message = '该项不能为空';
        }
        if (data.houseNo === '') {
            error.sub.houseNo.error = true;
            error.sub.houseNo.message = '该项不能为空';
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
        if (data.curFloor === '') {
            error.sub.curFloor.error = true;
            error.sub.curFloor.message = '该项不能为空';
        } else if (!isNaturalNum(data.curFloor)) {
            error.sub.curFloor.error = true;
            error.sub.curFloor.message = '请输入自然整数';
        } else if (Number(data.curFloor) < 1 || Number(data.curFloor) > 99) {
            error.sub.curFloor.error = true;
            error.sub.curFloor.message = '请输入1～99的自然整数';
        }
        if (data.totalFloor === '') {
            error.sub.totalFloor.error = true;
            error.sub.totalFloor.message = '该项不能为空';
        } else if (!isNaturalNum(data.totalFloor)) {
            error.sub.totalFloor.error = true;
            error.sub.totalFloor.message = '请输入自然整数';
        } else if (Number(data.totalFloor) < 1 || Number(data.totalFloor) > 99) {
            error.sub.totalFloor.error = true;
            error.sub.totalFloor.message = '请输入1～99的自然整数';
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

const validateSubItemPrice = (subItemPriceData, subType) => {
    const subPriceMap = {
        price: '价格',
        deposit: '押金',
    };
    const error = itemError({ subType });
    if (!subItemPriceData) {
        error.error = true;
        error.message = `请填写${subPriceMap[subType]}`;

        error.cause = 'EMPTY';
    } else if (!isFloatNum(subItemPriceData)) {
        error.error = true;
        error.message = `${subPriceMap[subType]}不是有效数字`;
    } else if (Number(subItemPriceData) < 0 || Number(subItemPriceData) > 999999) {
        error.error = true;
        error.message = '请输入1～999999之间的数字';
    }
    return error;
};

const validateItemPrice = (itemPriceData, type) => {
    const error = itemError({ type });
    const validatePriceTypeList = ['price', 'deposit'];
    validatePriceTypeList.forEach((subItemPriceType) => {
        error.sub[subItemPriceType] =
            validateSubItemPrice(itemPriceData[subItemPriceType], subItemPriceType);
        if (!error.error) {
            error.error = error.sub[subItemPriceType].error;
            error.message = error.sub[subItemPriceType].message;
        }
    });
    return error;
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
            error.message = '请输入0.1~999.9之间的数字';
        }
        return error;
    },
    priceInfo: (data) => {
        // const errorMessageMap = {
        //     month: '月付价',
        //     season: '季付价',
        //     halfYear: '半年价',
        //     year: '年付价',
        // };
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
    validateSubItemPrice,
    validateItemPrice,
};

export default validateData;
