export const changeRoomPrice = (index, { priceType, values }) => ({
    priceType,
    values,
    roomNo: index,
    type: 'house-upload.room-info.changePrice',
});

export const activeTags = (index, { value }) => ({
    index,
    value,
    type: 'house-upload.room-info.activeTags',
});

export const delActiveTags = (index, { value }) => ({
    index,
    value,
    type: 'house-upload.room-info.delActiveTags',
});

export const addTags = (index, { value }) => ({
    index,
    value,
    type: 'house-upload.room-info.addTags',
});

export const addRoomInfo = () => ({
    type: 'house-upload.room-info.addRoomInfo',
});
