const initialState = {
    rentalType: null,
    houseType: {
        room: 1,
        saloon: 0,
        toilet: 0,
    },
    village: {
        value: '',
        text: '',
    },
    houseFloor: {
        curFloor: '',
        totalFloor: '',
    },
    houseAddress: {
        buildNo: '',
        unitNo: '',
        houseNo: '',
    },
    keeperInfo: {
        name: '',
        phone: '',
        imgUrl: '',
    },
    houseTypeImgUrl: '',
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
                [action.roomType]: action.value,
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
                [action.name]: action.value,
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
    case 'house-upload.base-info.setHouseTypeImgUrl': {
        return {
            ...state,
            houseTypeImgUrl: action.value,
        };
    }
    default:
        return state;
    }
};


export default {
    baseInfo,
};
