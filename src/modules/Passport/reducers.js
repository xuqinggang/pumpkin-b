const initialState = {
    isOnline: true,
    userInfo: null,
};

const passportReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'passport.online': {
        return {
            ...state,
            isOnline: true,
            userInfo: action.userInfo,
        };
    }
    case 'passport.offline': {
        return {
            ...state,
            isOnline: false,
            userInfo: null,
        };
    }
    default: {
        return state;
    }
    }
};

export default passportReducer;
