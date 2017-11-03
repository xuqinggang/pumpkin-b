const initialState = {
    name: 'mikasa',
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'TEST_DATA':
        return {
            ...state,
            name: action.data.name,
        };
    default:
        return state;
    }
};
