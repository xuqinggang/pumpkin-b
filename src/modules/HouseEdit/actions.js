import axios from 'axios';
import errorNote, { ConvtCatchNetErrorMessage } from 'base/errorNote';
import { showAlert } from 'modules/Alert/actions';
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

export const fetchHouseEditData = (houseId, history) => (dispatch) => {
    if (!houseId) {
        dispatch(resetState());
    } else {
        axios.get(`/v1/houses/${houseId}`)
            .then((res) => {
                if (res.data.code === 200) {
                    const state = {
                        validateError: initData('validateError'),
                        roomTags: initData('roomTags'),
                        ...be2feAdapter(res.data.data),
                        houseId,
                    };
                    return {
                        type: 'SUCCESS',
                        data: state,
                    };
                }
                return {
                    type: 'FAILED',
                    message: res.data.msg || errorNote.OTHER_SUCCESS_ERR,
                };
            })
            .catch((e) => {
                const msg = ConvtCatchNetErrorMessage(e);
                return {
                    type: 'FAILED',
                    message: msg,
                };
            })
            .then((data) => {
                if (data.type === 'FAILED') {
                    dispatch(showAlert(data.message, () => {
                        history.push('/house-manage');
                    }));
                } else if (data.type === 'SUCCESS') {
                    dispatch(initState(data.data));
                }
            });
    }
};

