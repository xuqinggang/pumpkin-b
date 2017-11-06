const singleRoomState = {
    priceInfo: {
        month: {
            price: '',
            deposit: '',
        },
        season: {
            price: '',
            deposit: '',
        },
        halfYear: {
            price: '',
            deposit: '',
        },
        year: {
            price: '',
            deposit: '',
        },
    },
    roomTag: {
        tags: ['首次出租', '集体供暖', '独立供暖', '有电梯', '独立阳台', '独立卫生间', '随时入住', '免押金', '免费保洁', '只能门锁', '支持月付', '可短租'],
        active: [],
        maxActive: 4,
    },
    brief: '',
};

const initialState = [singleRoomState];

const singleRoomInfo = (state, action) => {
    switch (action.type) {
    case 'house-upload.room-info.changePrice': {
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
    case 'house-upload.room-info.activeTags': {
        const maxActive = state.roomTag.maxActive;
        if (state.roomTag.active.length >= maxActive) {
            return state;
        }

        const activeTags = state.roomTag.active.concat(action.value);

        return {
            ...state,
            roomTag: {
                ...state.roomTag,
                active: activeTags.slice(Math.max(activeTags.length - maxActive, 0)),
            },
        };
    }
    case 'house-upload.room-info.delActiveTags': {
        const activeTags = [].concat(state.roomTag.active);
        activeTags.splice(activeTags.indexOf(action.value), 1);
        return {
            ...state,
            roomTag: {
                ...state.roomTag,
                active: activeTags,
            },
        };
    }
    case 'house-upload.room-info.addTags': {
        const tags = [].concat(state.roomTag.tags);
        tags.push(action.value);
        return {
            ...state,
            roomTag: {
                ...state.roomTag,
                tags,
            },
        };
    }
    case 'house-upload.room-info.changeRoomBrief': {
        return {
            ...state,
            brief: action.value,
        };
    }
    default:
        return state;
    }
};

const roomInfo = (state = initialState, action) => {
    switch (action.type) {
    case 'house-upload.room-info.addRoomInfo': {
        return state.concat(singleRoomState);
    }
    case 'house-upload.room-info.changePrice':
    case 'house-upload.room-info.activeTags':
    case 'house-upload.room-info.delActiveTags':
    case 'house-upload.room-info.addTags':
    case 'house-upload.room-info.changeRoomBrief': {
        const newState = [].concat(state);
        newState.splice(action.index, 1, singleRoomInfo(state[action.index], action));
        return newState;
    }
    default:
        return state;
    }
};

export default {
    roomInfo,
};
