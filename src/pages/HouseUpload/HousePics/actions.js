export const uploadPics = (name, coords, picUrl) => ({
    name,
    coords,
    picUrl,
    type: 'house-upload.chamber-info.uploadPics',
});

export const removePics = (name, coords) => ({
    name,
    coords,
    type: 'house-upload.chamber-info.removePics',
});
