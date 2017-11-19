import initData from './Coms/InitData/index';

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

export const initState = state => ({
    state,
    type: 'house-upload.initState',
});

export const initHouseEditData = houseId => (dispatch) => {
    if (!houseId) {
        const state = {
            baseInfo: initData('baseInfo'),
            roomInfo: initData('roomInfo'),
            chamberInfo: initData('chamberInfo'),
            commonInfo: initData('commonInfo'),
            validateError: initData('validateError'),
            houseId: null,
        };
        dispatch(initState(state));
    } else {
        setTimeout(() => {
            const state = {
                baseInfo: { ...initData('baseInfo'), rentalType: 0 },
                roomInfo: initData('roomInfo'),
                chamberInfo: initData('chamberInfo'),
                commonInfo: initData('commonInfo'),
                validateError: initData('validateError'),
                houseId,
            };
            dispatch(initState(state));
        }, 5000);
    }
};

