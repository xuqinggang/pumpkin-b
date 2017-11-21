const initState = {
    hide: true,
};

const roomStatusChangeDialog = (state = initState, action) => {
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

export default roomStatusChangeDialog;
