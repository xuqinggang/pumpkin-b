import { num2Str, str2Num } from 'utils/index';
import initData from './coms/initData/index';

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
                text: data.name,
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

const fe2beAdapter = (data) => {
    const {
        buildNo,
        unitNo,
        houseNo,
    } = data.baseInfo.houseAddress;
    const {
        curFloor,
        totalFloor,
    } = data.baseInfo.houseFloor;
    const {
        room,
        saloon,
        toilet,
    } = data.baseInfo.houseType;
    const {
        name,
        phone,
        imgUrl,
    } = data.baseInfo.keeperInfo;
    const rentalTypeMap = {
        0: 'WHOLE',
        1: 'SHARED',
    };

    const rentsConvert = (rentsData, rentalType) => {
        const {
            priceInfo,
        } = rentsData;
        return {
            rentalType,

            number: rentsData.roomId,
            area: str2Num(rentsData.roomArea),
            direct: rentsData.direct,

            priceMonth: priceInfo.month.price,
            depositMonth: priceInfo.month.deposit,

            priceSeason: priceInfo.season.price,
            depositSeason: priceInfo.season.deposit,

            priceHalfYear: priceInfo.halfYear.price,
            depositHalfYear: priceInfo.halfYear.deposit,

            priceYear: priceInfo.year.price,
            depositYear: priceInfo.year.deposit,

            tags: rentsData.roomTag.active,

            intro: rentsData.brief,
        };
    };
    const singleRoomConvert = (singleData, roomType, roomId) => ({
        type: roomType,
        number: roomId,
        images: singleData.picUrls,
        furniture: singleData.deploys,
    });
    const roomConvert = (chamberInfo) => {
        let allRoomInfoList = [];
        const roomTypes = ['rooms', 'saloons', 'toilets', 'kitchens'];
        const roomTypeMap = {
            rooms: 'BEDROOM',
            toilets: 'BATHROOM',
            saloons: 'LIVINGROOM',
            kitchens: 'KITCHEN',
        };
        roomTypes.forEach((roomType) => {
            allRoomInfoList = allRoomInfoList.concat(
                chamberInfo[roomType].map((sigleRoomData, index) => (
                    // TODO roomId 和 index 对应关系
                    singleRoomConvert(sigleRoomData, roomTypeMap[roomType], index + 1)
                )),
            );
        });
        return allRoomInfoList;
    };
    return {
        houseParam: {
            blockId: data.baseInfo.village.value,
            buildingNum: str2Num(buildNo),
            unitNum: str2Num(unitNo),
            houseNum: str2Num(houseNo),
            floor: str2Num(curFloor),
            totalFloor: str2Num(totalFloor),
            bedroomCount: room,
            livingRoomCount: saloon,
            bathroomCount: toilet,

            supervisorName: name,
            supervisorTel: phone,
            supervisorImg: imgUrl,
        },

        rentalType: rentalTypeMap[data.baseInfo.rentalType],

        rents: data.roomInfo.map(rentData => rentsConvert(rentData)),

        roomParams: roomConvert(data.chamberInfo),
    };
};

export {
    be2feAdapter,
    fe2beAdapter,
};
