const initState = () => ({
    hide: true,
    text: '',
});

const message = (state = initState(), action) => {
    switch (action.type) {
    case 'message.hide': {
        return initState();
    }
    case 'message.show': {
        return {
            hide: false,
            text: action.text,
        };
    }
    default:
        return state;
    }
};

export default message;
