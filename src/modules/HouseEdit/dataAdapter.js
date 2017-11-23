import { num2Str, str2Num } from 'utils/index';
import { creatChamberArr } from './coms/initData/index';

const be2feAdapter = (data) => {
    const rentalTypeMap = {
        WHOLE: 0,
        SHARED: 1,
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

    const chamberConvert = chamberData => (
        chamberData.map(chamberItem => ({
            roomId: chamberItem.number,
            picUrls: chamberItem.images || [],
            deploys: chamberItem.furniture || [],
        }))
    );
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
                text: data.blockName,
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

        chamberInfo: {
            rooms: chamberConvert(data.bedrooms),
            saloons: chamberConvert(data.livingRooms),
            toilets: chamberConvert(data.bathrooms),
            kitchens: chamberConvert(data.kitchen).length === 0
                ? [creatChamberArr(1)]
                : chamberConvert(data.kitchen),
        },
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
    const chamberConvert = chamberInfo => (
        chamberInfo.map(chamberItem => ({
            number: chamberItem.roomId,
            images: chamberItem.picUrls,
            furniture: chamberItem.deploys,
        }))
    );
    return {
        house: {
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

        bedrooms: chamberConvert(data.chamberInfo.rooms),
        livingRooms: chamberConvert(data.chamberInfo.saloons),
        bathrooms: chamberConvert(data.chamberInfo.toilets),
        kitchens: chamberConvert(data.chamberInfo.kitchens),
    };
};

export {
    be2feAdapter,
    fe2beAdapter,
};
