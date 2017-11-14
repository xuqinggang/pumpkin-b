const creatChamberArr = (num) => {
    const arr = [];
    for (let i = 0; i < num; i += 1) {
        arr.push({ picUrls: [], deploys: [] });
    }
    return arr;
};

const initData = (type, extra) => {
    switch (type) {
    case 'roomInfo': {
        const roomId = new Date().getTime();
        const singleRoomState = {
            roomId,
            expand: extra ? extra.expand : false, // 默认
            roomArea: '',
            priceInfo: {
                month: {
                    price: '',
                    deposit: '',
                },
                season: {
                    price: '',
                    deposit: '',
                },
                halfYear: {
                    price: '',
                    deposit: '',
                },
                year: {
                    price: '',
                    deposit: '',
                },
            },
            roomTag: {
                tags: ['首次出租', '集体供暖', '独立供暖', '有电梯', '独立阳台', '独立卫生间', '随时入住', '免押金', '免费保洁', '只能门锁', '支持月付', '可短租'],
                active: [],
                maxActive: 4,
            },
            brief: '',
        };
        return [singleRoomState];
    }
    case 'chamberInfo': {
        const {
            roomNum = 1,
            saloonNum = 1,
            toiletNum = 1,
            kitchenNum = 1,
        } = extra || {};

        return {
            rooms: creatChamberArr(roomNum),
            saloons: creatChamberArr(saloonNum),
            toilets: creatChamberArr(toiletNum),
            kitchens: creatChamberArr(kitchenNum),
        };
    }
    default:
    }
};

export {
    creatChamberArr,
};

export default initData;
