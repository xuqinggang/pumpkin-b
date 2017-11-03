const initialState = {
    priceInfo: {
        month: {
            price: '',
            deposit: '',
        },
    },
};

const HouseInfo = (state = initialState, action) => {
    switch (action.type) {
    case 'house-upload.house-info.changePrice': {
        const priceType = action.priceType;
        const values = action.values;
        return {
            ...state,
            priceInfo: {
                ...state.priceInfo,
                [priceType]: values,
            },
        };
    }
    default:
        return state;
    }
};

export default {
    HouseInfo,
};
