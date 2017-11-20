import initData from '../coms/InitData/index';

const singleRoomInfo = (state, action) => {
    switch (action.type) {
    case 'house-upload.room-info.setRoomArea': {
        return {
            ...state,
            roomArea: action.value,
        };
    }
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
        const activeTags = state.roomTag.active.concat(action.value);

        return {
            ...state,
            roomTag: {
                ...state.roomTag,
                active: activeTags,
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

const roomInfo = (state = [], action) => {
    switch (action.type) {
    case 'house-upload.room-info.addRoomInfo': {
        return state.map(item => ({
            ...item,
            expand: false,
        })).concat(initData('roomInfo', { expand: true }));
    }
    case 'house-upload.room-info.delRoomInfo': {
        const newState = [].concat(state);
        const roomIds = state.map(item => (item.roomId));
        const roomIndex = roomIds.indexOf(action.roomId);
        newState.splice(roomIndex, 1);
        return newState;
    }
    case 'house-upload.room-info.switchRoomExpand': {
        return state.map(item => ({
            ...item,
            expand: action.roomId === item.roomId,
        }));
    }
    case 'house-upload.room-info.setRoomArea':
    case 'house-upload.room-info.changePrice':
    case 'house-upload.room-info.activeTags':
    case 'house-upload.room-info.delActiveTags':
    case 'house-upload.room-info.addTags':
    case 'house-upload.room-info.changeRoomBrief': {
        const newState = [].concat(state);
        const roomIds = state.map(item => (item.roomId));
        const roomIndex = roomIds.indexOf(action.roomId);
        newState.splice(roomIndex, 1, singleRoomInfo(state[roomIndex], action));
        return newState;
    }
    default:
        return state;
    }
};

export default {
    roomInfo,
};
