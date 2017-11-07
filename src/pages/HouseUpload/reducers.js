import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import RoomInfoReducers from './RoomInfo/reducers';
import HousePicsReducers from './HousePics/reducers';
import BaseInfoReducers from './BaseInfo/reducers';
import initState from './Coms/InitState/index';

// export default combineReducers({
//     ...RoomInfoReducers,
//     ...HousePicsReducers,
// });
const commonInfo = (
    state = {
        rentalType: null,
        houseType: {
            room: null,
            saloon: null,
            toilet: null,
        },
    }) => (state);

export default reduceReducers(
    combineReducers({
        ...RoomInfoReducers,
        ...HousePicsReducers,
        ...BaseInfoReducers,
        commonInfo,
    }),
    // cross-cutting concerns because here `state` is the whole state tree
    (state, action) => {
        switch (action.type) {
        case 'house-upload.base-info.switchRentalType': {
            return state;
        }
        case 'house-upload.nextStep':
            switch (action.curPage) {
            case 1: {
                let newRoomInfo = state.roomInfo;
                let newHousePics = state.housePics;

                if (state.commonInfo.rentalType !== null) {
                    // 进入修改数据逻辑
                    const rentalType = state.baseInfo.rentalType;
                    const {
                        room,
                        saloon,
                        toilet,
                    } = state.baseInfo.houseType;
                    const lastHouseType = state.commonInfo.houseType;

                    if (state.commonInfo.rentalType !== rentalType ||
                        lastHouseType.room !== room ||
                        lastHouseType.saloon !== saloon ||
                        lastHouseType.toilet !== toilet) {
                        // 当 切换出租类型 或 户型变化 时，初始化之后页面的数据
                        newRoomInfo = initState('room-info');
                        newHousePics = initState('house-pics', {
                            roomNum: room,
                            saloonNum: saloon,
                            toiletNum: toilet,
                        });
                    }
                } else {
                    newRoomInfo = initState('room-info');
                }
                return {
                    ...state,

                    // 当
                    // 点击下一步，提取基础信息的公用重要信息，修改可导致其他数据的更改
                    commonInfo: {
                        rentalType: state.baseInfo.rentalType,
                        houseType: {
                            ...state.baseInfo.houseType,
                        },
                    },
                    roomInfo: newRoomInfo,
                    housePics: newHousePics,
                };
            }
            default:
                return state;
            }
        default:
            return state;
        }
    },
);
