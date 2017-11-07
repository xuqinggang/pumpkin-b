export const switchRentalType = value => ({
    value,
    type: 'house-upload.base-info.switchRentalType',
});

export const setHouseType = (roomType, number) => ({
    roomType,
    number,
    type: 'house-upload.base-info.setHouseType',
});

export const setVillageInfo = ({ value, text }) => ({
    value,
    text,
    type: 'house-upload.base-info.setVillageInfo',
});

export const setHouseFloor = ({ name, number }) => ({
    name,
    number,
    type: 'house-upload.base-info.setHouseFloor',
});

