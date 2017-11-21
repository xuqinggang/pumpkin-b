export const showStatusChangeDialog = (statusType, onConfirm) => ({
    statusType,
    onConfirm,
    type: 'houseManage-showStatusChangeDialog',
});

export const hideStatusChangeDialog = () => ({
    type: 'houseManage-hideStatusChangeDialog',
});
