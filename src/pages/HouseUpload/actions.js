export const nextStep = pageType => ({
    pageType,
    type: 'house-upload.nextStep',
});

export const showValidateError = ({ pageType, error }) => ({
    pageType,
    error,
    type: 'house-upload.showValidateError',
});

export const hideValidateError = ({ pageType }) => ({
    pageType,
    type: 'house-upload.hideValidateError',
});
