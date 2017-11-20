import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import RoomInfoReducers from './RoomInfo/reducers';
import ChamberInfoReducers from './reducers/chamberInfo';
import BaseInfoReducers from './BaseInfo/reducers';
import initData, { creatChamberArr } from './coms/InitData/index';

const cropChamberArrWithRoomIds = (arr, { roomIds, number }) => {
    if (roomIds !== undefined) {
        return roomIds.map((roomId) => {
            let roomItem = {
                roomId,
                ...creatChamberArr(1)[0],
            };
            arr.some((item) => {
                if (item.roomId === roomId) {
                    roomItem = item;
                    return true;
                }
                return false;
            });
            return roomItem;
        });
    }
    if (number !== undefined) {
        let newArr = [].concat(arr);
        if (arr.length > number) {
            newArr.splice(number);
        }
        if (arr.length < number) {
            newArr = newArr.concat(creatChamberArr(number - arr.length));
        }
        return newArr;
    }
};

const commonInfo = (
    state = initData('commonInfo'),
) => (state);

const validateError = (
    state = initData('validateError'),
) => (state);

const roomTags = (
    state = initData('roomTags'),
) => (state);

const roomDeploys = (
    state = initData('roomDeploys'),
) => (state);

const houseId = (state = null) => (state);

export default reduceReducers(
    combineReducers({
        ...RoomInfoReducers,
        ...ChamberInfoReducers,
        ...BaseInfoReducers,
        commonInfo,
        roomTags,
        roomDeploys,
        validateError,
        houseId,
    }),
    // cross-cutting concerns because here `state` is the whole state tree
    (state, action) => {
        switch (action.type) {
        case 'house-upload.base-info.switchRentalType': {
            return state;
        }
        case 'house-upload.nextStep':
            switch (action.pageType) {
            case 'baseInfo': {
                // 当 出租类型变化 或 户型变化 时，初始化之后页面的数据
                const rentalType = state.baseInfo.rentalType;
                const {
                    room,
                    saloon,
                    toilet,
                } = state.baseInfo.houseType;
                const lastHouseType = state.commonInfo.houseType;

                if (state.commonInfo.rentalType === rentalType &&
                    lastHouseType.room === room &&
                    lastHouseType.saloon === saloon &&
                    lastHouseType.toilet === toilet) {
                    return state;
                }
                return {
                    ...state,
                    // 点击下一步，提取基础信息的公用重要信息，修改可导致其他数据的更改
                    commonInfo: {
                        rentalType: state.baseInfo.rentalType,
                        houseType: {
                            ...state.baseInfo.houseType,
                        },
                    },
                    roomInfo: initData('roomInfo', { expand: true }),
                    chamberInfo: initData('chamberInfo'),
                };
            }
            case 'roomInfo': {
                const {
                    room,
                    saloon,
                    toilet,
                } = state.commonInfo.houseType;

                let newChamberInfo = state.chamberInfo;
                if (state.commonInfo.rentalType === 0) {
                    // 整租
                    newChamberInfo = {
                        ...state.chamberInfo,
                        rooms: cropChamberArrWithRoomIds(
                            state.chamberInfo.rooms,
                            { number: room },
                        ),
                        saloons: cropChamberArrWithRoomIds(
                            state.chamberInfo.saloons,
                            { number: saloon },
                        ),
                        toilets: cropChamberArrWithRoomIds(
                            state.chamberInfo.toilets,
                            { number: toilet },
                        ),
                    };
                }
                if (state.commonInfo.rentalType === 1) {
                    // 合租
                    const roomIds = state.roomInfo.map(item => (item.roomId));
                    newChamberInfo = {
                        ...state.chamberInfo,
                        rooms: cropChamberArrWithRoomIds(
                            state.chamberInfo.rooms,
                            { roomIds },
                        ),
                        saloons: cropChamberArrWithRoomIds(
                            state.chamberInfo.saloons,
                            { number: saloon },
                        ),
                        toilets: cropChamberArrWithRoomIds(
                            state.chamberInfo.toilets,
                            { number: toilet },
                        ),
                    };
                }

                return {
                    ...state,
                    chamberInfo: newChamberInfo,
                };
            }
            default:
                return state;
            }
        case 'house-upload.showValidateError': {
            return {
                ...state,
                validateError: {
                    ...state.validateError,
                    [action.pageType]: action.error,
                },
            };
        }
        case 'house-upload.hideValidateError': {
            return {
                ...state,
                validateError: {
                    ...state.validateError,
                    [action.pageType]: null,
                },
            };
        }
        case 'house-upload.initState': {
            return {
                ...action.state,
            };
        }
        default:
            return state;
        }
    },
);
