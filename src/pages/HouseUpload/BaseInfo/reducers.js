const initialState = {
    rentalType: 0,
    houseType: {
        room: 0,
        saloon: 0,
        toilet: 0,
    },
    village: {
        value: null,
        text: '',
    },
    houseFloor: {
        curFloor: 1,
        totalFloor: 1,
    },
};

const baseInfo = (state = initialState, action) => {
    switch (action.type) {
    case 'house-upload.base-info.switchRentalType': {
        return {
            ...state,
            rentalType: action.value,
        };
    }
    case 'house-upload.base-info.setHouseType': {
        return {
            ...state,
            houseType: {
                ...state.houseType,
                [action.roomType]: action.number,
            },
        };
    }
    case 'house-upload.base-info.setVillageInfo': {
        return {
            ...state,
            village: {
                value: action.value,
                text: action.text,
            },
        };
    }
    case 'house-upload.base-info.setHouseFloor': {
        return {
            ...state,
            houseFloor: {
                ...state.houseFloor,
                [action.name]: action.number,
            },
        };
    }
    default:
        return state;
    }
};


export default {
    baseInfo,
};
