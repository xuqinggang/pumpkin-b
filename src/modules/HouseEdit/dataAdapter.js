import { num2Str } from 'utils/index';
import initData from './coms/initData';

const be2feAdapter = (data) => {
    const rentalTypeMap = {
        WHOLE: 0,
        SHARED: 1,
    };

    const roomTypeMap = {
        BEDROOM: 'rooms',
        BATHROOM: 'toilets',
        LIVINGROOM: 'saloons',
        KITCHEN: 'kitchens',
    };

    const rentalUnit = (unitData, expand = false) => ({
        roomId: unitData.roomNumber,
        expand,
        roomArea: num2Str(unitData.area),
        direct: unitData.direct,
        priceInfo: {
            month: {
                price: num2Str(unitData.priceMonth),
                deposit: num2Str(unitData.depositMonth),
            },
            season: {
                price: num2Str(unitData.priceSeason),
                deposit: num2Str(unitData.depositSeason),
            },
            halfYear: {
                price: num2Str(unitData.priceHalfYear),
                deposit: num2Str(unitData.depositHalfYear),
            },
            year: {
                price: num2Str(unitData.priceYear),
                deposit: num2Str(unitData.depositYear),
            },
        },
        roomTag: {
            active: unitData.tags,
        },
        brief: unitData.intro === null ? '' : unitData.intro,
    });

    const chamberConvert = (chamberData) => {
        const chamberInfo = initData('chamberInfo', {
            roomNum: 0,
            saloonNum: 0,
            toiletNum: 0,
            kitchenNum: 0,
        });
        chamberData.forEach((item) => {
            const itemData = {
                roomId: item.number,
                picUrls: item.images || [],
                deploys: item.furniture || [],
            };
            chamberInfo[roomTypeMap[item.type]].push(itemData);
        });
        return {
            ...initData('chamberInfo', {
                roomNum: 1,
                saloonNum: 1,
                toiletNum: 1,
                kitchenNum: 1,
            }),
            ...chamberInfo,
        };
    };
    return {
        baseInfo: {
            rentalType: rentalTypeMap[data.rentalType],
            houseType: {
                room: data.bedroomCount,
                saloon: data.livingRoomCount,
                toilet: data.bathroomCount,
            },
            village: {
                value: data.blockId,
                text: '后端接口暂无',
            },
            houseFloor: {
                curFloor: num2Str(data.floor),
                totalFloor: num2Str(data.totalFloor),
            },
            houseAddress: {
                buildNo: num2Str(data.buildingNum),
                unitNo: num2Str(data.unitNum),
                houseNo: num2Str(data.houseNum),
            },
            keeperInfo: {
                name: data.supervisorName,
                phone: num2Str(data.supervisorTel),
                imgUrl: data.supervisorImg,
            },
        },
        roomInfo: data.rentUnits.map(item => (rentalUnit(item))),

        commonInfo: {
            rentalType: rentalTypeMap[data.rentalType],
            houseType: {
                room: data.bedroomCount,
                saloon: data.livingRoomCount,
                toilet: data.bathroomCount,
            },
        },

        chamberInfo: chamberConvert(data.room),
    };
};

const fe2beAdapter = () => {
    // TODO
};

export {
    be2feAdapter,
    fe2beAdapter,
};
