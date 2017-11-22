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
            isSortByTime: action.value,
        };
    }
    case 'houseManage-filterListBy': {
        return {
            ...state,
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
    default:
        return state;
    }
};
export default combineReducers({
    houseList,
    filter,
    roomStatusDialog,
});
