const initialState = {
    hide: true,
    text: '',
    onClick: null,
};

const alertQueue = [];
const alert = (state = initialState, action) => {
    switch (action.type) {
    case 'alert.show': {
        alertQueue.push({
            text: action.text,
            onClick: action.onClick,
        });
        return {
            hide: false,
            ...alertQueue[0],
        };
    }
    case 'alert.hide': {
        alertQueue.shift();
        if (alertQueue.length > 0) {
            return {
                hide: false,
                ...alertQueue[0],
            };
        }
        return initialState;
    }
    case 'alert.clear': {
        alertQueue.splice(0);
        return initialState;
    }
    default:
        return state;
    }
};

export default alert;
