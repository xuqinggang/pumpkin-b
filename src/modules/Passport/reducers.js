const initialState = {
    isOnline: false,
    userName: '',
    phone: '',
};

const passportReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'passport.online': {
        return {
            ...state,
            isOnline: true,
            userName: action.userName,
            phone: action.phone,
        };
    }
    case 'passport.offline': {
        return {
            ...state,
            isOnline: true,
            userName: action.userName,
            phone: action.phone,
        };
    }
    default: {
        return state;
    }
    }
};

export default passportReducer;
