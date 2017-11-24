import { combineReducers } from 'redux';

const initRoomStatusDialogState = {
    hide: true,
};

const roomStatusDialog = (state = initRoomStatusDialogState, action) => {
    switch (action.type) {
    case 'houseManage-showStatusChangeDialog': {
        return {
            type: action.statusType,
            hide: false,
            onConfirm: action.onConfirm,
        };
    }
    case 'houseManage-hideStatusChangeDialog': {
        return {
            hide: true,
        };
    }
    default:
        return state;
    }
};

const initFilterState = {
    isSortByTime: true,
    village: 'ALL',
    rentalType: 'ALL',
    roomStatus: 'ALL',
    curPage: 1,
    totalPage: 1,
};

const filter = (state = initFilterState, action) => {
    switch (action.type) {
    case 'houseManage-sortListByTime': {
        return {
            ...state,
            curPage: 1, // 重置页码
            isSortByTime: action.value,
        };
    }
    case 'houseManage-filterListBy': {
        return {
            ...state,
            curPage: 1, // 重置页码
            [action.filterType]: action.value,
        };
    }
    case 'houseManage-changePage': {
        return {
            ...state,
            curPage: action.curPage,
            totalPage: action.totalPage,
        };
    }
    default:
        return state;
    }
};

const initListState = [];

const houseList = (state = initListState, action) => {
    switch (action.type) {
    case 'houseManage-updateHouseManageList': {
        return action.houseList;
    }
    case 'houseManage-deleteHouse': {
        const houseIds = state.map(item => (item.id));
        const curHouseIndex = houseIds.indexOf(action.houseId);

        const newState = [...state];
        newState.splice(curHouseIndex, 1);
        return newState;
    }
    case 'houseManage-updateRentalUnitStatus': {
        const houseIds = state.map(item => (item.id));
        const curHouseIndex = houseIds.indexOf(action.houseId);
        const rentUnitIds = state[curHouseIndex].rentUnits.map(item => (item.id));
        const curRentUnitIndex = rentUnitIds.indexOf(action.rentUnitId);

        const curRentUnit = state[curHouseIndex].rentUnits[curRentUnitIndex];

        // 更改数据
        const newRentUnit = {
            ...curRentUnit,
            status: action.status,
        };

        const newRentUnits = [...state[curHouseIndex].rentUnits];
        newRentUnits.splice(curRentUnitIndex, 1, newRentUnit);

        const newState = [...state];
        newState.splice(curHouseIndex, 1, {
            ...state[curHouseIndex],
            rentUnits: newRentUnits,
        });

        return newState;
    }
    default:
        return state;
    }
};
export default combineReducers({
    houseList,
    filter,
    roomStatusDialog,
});
