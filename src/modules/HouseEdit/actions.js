import axios from 'axios';
import initData from './coms/initData/index';
import { be2feAdapter } from './dataAdapter';

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

export const resetState = () => (dispatch) => {
    const state = {
        baseInfo: initData('baseInfo'),
        roomInfo: initData('roomInfo'),
        chamberInfo: initData('chamberInfo'),
        commonInfo: initData('commonInfo'),
        validateError: initData('validateError'),
        houseId: null,
    };
    dispatch(initState(state));
};

export const fetchHouseEditData = houseId => (dispatch) => {
    if (!houseId) {
        dispatch(resetState());
    } else {
        axios.get(`/v1/houses/${houseId}`)
            .then((res) => {
                const state = {
                    validateError: initData('validateError'),
                    roomTags: initData('roomTags'),
                    ...be2feAdapter(res.data.data),
                    houseId,
                };
                dispatch(initState(state));
            });
    }
};

