const initialState = {
    onlineStatus: 'UNSET',
    userInfo: null,
};

const passportReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'passport.online': {
        return {
            ...state,
            onlineStatus: 'ON',
        };
    }
    case 'passport.offline': {
        return {
            ...state,
            onlineStatus: 'OFF',
        };
    }
    case 'passport.passportInfo': {
        return {
            ...state,
            userInfo: action.userInfo,
        };
    }
    case 'passport.clearPassportInfo': {
        return {
            ...state,
            userInfo: null,
        };
    }
    default: {
        return state;
    }
    }
};

export default passportReducer;
