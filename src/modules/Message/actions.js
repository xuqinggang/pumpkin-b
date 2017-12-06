export const hideMessage = () => ({
    type: 'message.hide',
});

export const showMessage = text => ({
    text,
    type: 'message.show',
});
