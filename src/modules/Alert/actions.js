export const showAlert = (text, onClick = null) => ({
    text,
    onClick,
    type: 'alert.show',
});

export const hideAlert = () => ({
    type: 'alert.hide',
});

export const clearAlert = () => ({
    type: 'alert.clear',
});
