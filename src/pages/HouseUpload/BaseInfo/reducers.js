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
    houseAddress: {
        buildNo: null,
        unitNo: null,
        houseNo: null,
    },
    keeperInfo: {
        name: '',
        phone: '',
        imgUrl: '',
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
    case 'house-upload.base-info.setHouseAddress': {
        return {
            ...state,
            houseAddress: {
                ...state.houseAddress,
                [action.name]: action.value,
            },
        };
    }
    case 'house-upload.base-info.setKeeperInfo': {
        return {
            ...state,
            keeperInfo: {
                ...state.keeperInfo,
                [action.name]: action.value,
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
