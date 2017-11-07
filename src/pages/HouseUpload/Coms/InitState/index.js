const creat2DimArr = (num) => {
    const arr = [];
    for (let i = 0; i < num; i += 1) {
        arr.push([]);
    }
    return arr;
};

const initState = (type, extra) => {
    switch (type) {
    case 'room-info': {
        const singleRoomState = {
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
    case 'house-pics': {
        const {
            roomNum = 1,
            saloonNum = 1,
            toiletNum = 1,
            kitchenNum = 1,
        } = extra || {};

        return {
            rooms: creat2DimArr(roomNum),
            saloons: creat2DimArr(saloonNum),
            toilets: creat2DimArr(toiletNum),
            kitchens: creat2DimArr(kitchenNum),
        };
    }
    default:
    }
};

export default initState;
