export const switchRentalType = value => ({
    value,
    type: 'house-upload.base-info.switchRentalType',
});

export const setHouseType = (roomType, value) => ({
    roomType,
    value,
    type: 'house-upload.base-info.setHouseType',
});

export const setVillageInfo = ({ value, text }) => ({
    value,
    text,
    type: 'house-upload.base-info.setVillageInfo',
});

export const setHouseFloor = ({ name, value }) => ({
    name,
    value,
    type: 'house-upload.base-info.setHouseFloor',
});

export const setHouseAddress = ({ name, value }) => ({
    name,
    value,
    type: 'house-upload.base-info.setHouseAddress',
});

export const setKeeperInfo = ({ name, value }) => ({
    name,
    value,
    type: 'house-upload.base-info.setKeeperInfo',
});

export const setHouseTypeImgUrl = value => ({
    value,
    type: 'house-upload.base-info.setHouseTypeImgUrl',
});
