import { combineReducers } from 'redux';
import houseUpload from 'modules/HouseEdit/reducers';
import passport from 'modules/Passport/reducers';
import message from 'modules/Message/reducers';
import houseManage from 'modules/HouseManageList/reducers';

export default combineReducers({
    houseUpload,
    houseManage,
    passport,
    message,
});
