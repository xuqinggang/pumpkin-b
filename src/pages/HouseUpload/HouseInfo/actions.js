export const changeHousePrice = (priceType, values) => ({
    priceType,
    values,
    type: 'house-upload.house-info.changePrice',
});

export const activeTags = value => ({
    value,
    type: 'house-upload.house-info.activeTags',
});

export const delActiveTags = value => ({
    value,
    type: 'house-upload.house-info.delActiveTags',
});

export const addTags = value => ({
    value,
    type: 'house-upload.house-info.addTags',
});
