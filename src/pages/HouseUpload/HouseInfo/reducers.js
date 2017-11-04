const initialState = {
    priceInfo: {
        month: {
            price: '',
            deposit: '',
        },
    },
    houseTag: {
        tags: ['首次出租', '集体供暖', '独立供暖', '有电梯', '独立阳台', '独立卫生间', '随时入住', '免押金', '免费保洁', '只能门锁', '支持月付', '可短租'],
        active: [],
        maxActive: 4,
    },
};

const houseInfo = (state = initialState, action) => {
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
    case 'house-upload.house-info.activeTags': {
        const maxActive = state.houseTag.maxActive;
        if (state.houseTag.active.length >= maxActive) {
            return state;
        }

        const activeTags = state.houseTag.active.concat(action.value);

        return {
            ...state,
            houseTag: {
                ...state.houseTag,
                active: activeTags.slice(Math.max(activeTags.length - maxActive, 0)),
            },
        };
    }
    case 'house-upload.house-info.delActiveTags': {
        const activeTags = [].concat(state.houseTag.active);
        activeTags.splice(activeTags.indexOf(action.value), 1);
        return {
            ...state,
            houseTag: {
                ...state.houseTag,
                active: activeTags,
            },
        };
    }
    case 'house-upload.house-info.addTags': {
        const tags = [].concat(state.houseTag.tags);
        tags.push(action.value);
        return {
            ...state,
            houseTag: {
                ...state.houseTag,
                tags,
            },
        };
    }
    default:
        return state;
    }
};

export default {
    houseInfo,
};
