export const changeRoomPrice = (roomId, { priceType, values }) => ({
    roomId,
    priceType,
    values,
    type: 'house-upload.room-info.changePrice',
});

export const setRoomArea = (roomId, { value }) => ({
    roomId,
    value,
    type: 'house-upload.room-info.setRoomArea',
});

export const setRoomDirect = (roomId, { value }) => ({
    roomId,
    value,
    type: 'house-upload.room-info.setRoomDirect',
});

export const activeTags = (roomId, { value }) => ({
    roomId,
    value,
    type: 'house-upload.room-info.activeTags',
});

export const delActiveTags = (roomId, { value }) => ({
    roomId,
    value,
    type: 'house-upload.room-info.delActiveTags',
});

export const addTags = (roomId, { value }) => ({
    roomId,
    value,
    type: 'house-upload.room-info.addTags',
});

export const addRoomInfo = () => ({
    type: 'house-upload.room-info.addRoomInfo',
});

export const delRoomInfo = roomId => ({
    roomId,
    type: 'house-upload.room-info.delRoomInfo',
});

export const changeRoomBrief = (roomId, { value }) => ({
    roomId,
    value,
    type: 'house-upload.room-info.changeRoomBrief',
});

export const switchRoomExpand = roomId => ({
    roomId,
    type: 'house-upload.room-info.switchRoomExpand',
});
