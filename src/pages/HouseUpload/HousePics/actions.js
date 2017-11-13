export const uploadPics = (name, coords, picUrl) => ({
    name,
    coords,
    picUrl,
    type: 'house-upload.house-pics.uploadPics',
});

export const removePics = (name, coords) => ({
    name,
    coords,
    type: 'house-upload.house-pics.removePics',
});
