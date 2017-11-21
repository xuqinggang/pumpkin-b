export const addDeploys = (name, coords, value) => ({
    name,
    coords,
    value,
    type: 'house-upload.chamber-info.addDeploys',
});

export const removeDeploys = (name, coords) => ({
    name,
    coords,
    type: 'house-upload.chamber-info.removeDeploys',
});
