const creatChamberArr = (num) => {
    const arr = [];
    for (let i = 0; i < num; i += 1) {
        arr.push({ picUrls: [], deploys: [], offline: true });
    }
    return arr;
};

const initRentalUnit = (data = {}) => {
    const roomId = new Date().getTime();
    return {
        roomId,
        offline: true, // 用于区分新增和后端请求回的数据
        expand: false, // 默认
        roomArea: '',
        direct: 'SOUTH',
        priceInfo: {
            month: {
                price: '',
                deposit: '',
                checked: false,
            },
            season: {
                price: '',
                deposit: '',
                checked: true,
            },
            halfYear: {
                price: '',
                deposit: '',
                checked: false,
            },
            year: {
                price: '',
                deposit: '',
                checked: false,
            },
        },
        roomTag: {
            active: [],
        },
        brief: '',
        ...data,
    };
};

const initData = (type, extra = {}) => {
    switch (type) {
    case 'roomInfo': {
        return [initRentalUnit(extra)];
    }
    case 'chamberInfo': {
        const {
            roomNum = 1,
            saloonNum = 1,
            toiletNum = 1,
            kitchenNum = 1,
        } = extra;

        return {
            rooms: creatChamberArr(roomNum),
            saloons: creatChamberArr(saloonNum),
            toilets: creatChamberArr(toiletNum),
            kitchens: creatChamberArr(kitchenNum),
        };
    }
    case 'baseInfo': {
        return {
            rentalType: null,
            houseType: {
                room: 1,
                saloon: 0,
                toilet: 0,
            },
            houseTypeImgUrl: '',
            village: {
                value: '',
                text: '',
            },
            houseFloor: {
                curFloor: '',
                totalFloor: '',
            },
            houseAddress: {
                buildNo: '',
                unitNo: '',
                houseNo: '',
            },
            keeperInfo: {
                name: '',
                phone: '',
                imgUrl: '',
            },
        };
    }
    case 'commonInfo': {
        return {
            rentalType: null,
            houseType: {
                room: null,
                saloon: null,
                toilet: null,
            },
        };
    }
    case 'validateError': {
        return {
            baseInfo: null,
            roomInfo: null,
            housePics: null,
        };
    }
    case 'roomTags': {
        return {
            maxActiveTagNum: 4,
            allTag: [{
                value: 'FIRST_RENTAL',
                text: '首次出租',
            }, {
                value: 'BALCONY',
                text: '独立阳台',
            }, {
                value: 'BATHROOM',
                text: '独立卫生间',
            }, {
                value: 'CENTRALIZED_HEATER',
                text: '集中供暖',
            }, {
                value: 'INDIVIDUAL_HEATER',
                text: '独立供暖',
            }, {
                value: 'AVAILABLE',
                text: '随时入住',
            }, {
                value: 'ELEVATOR',
                text: '有电梯',
            }, {
                value: 'HOUSEKEEPING',
                text: '免费保洁',
            }, {
                value: 'ELECTRONIC_LOCKER',
                text: '智能门锁',
            }, {
                value: 'SHORT_TERM',
                text: '支持短租',
            }, {
                value: 'CENTRALIZED',
                text: '集中式公寓',
            }],
        };
    }
    case 'roomDeploys': {
        return {
            allDeploys: [{
                value: 'BED',
                text: '床',
            }, {
                value: 'WARDROBE',
                text: '衣柜',
            }, {
                value: 'AIRCONDITION',
                text: '空调',
            }, {
                value: 'CHAIRS',
                text: '椅子',
            }, {
                value: 'SOFA',
                text: '沙发',
            }, {
                value: 'TV',
                text: '电视',
            }, {
                value: 'WIFI',
                text: '无线网络',
            }, {
                value: 'COOKER',
                text: '炉灶',
            }, {
                value: 'HEATER',
                text: '加热器',
            }, {
                value: 'REFRIGIRATER',
                text: '冰箱',
            }, {
                value: 'VENTILATOR',
                text: '通风机',
            }, {
                value: 'MICROWAVE',
                text: '微波炉',
            }, {
                value: 'OVEN',
                text: '烤箱',
            }, {
                value: 'WASHMACHINE',
                text: '洗衣机',
            }],
        };
    }
    default:
    }
};

export {
    creatChamberArr,
};

export default initData;
