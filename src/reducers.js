import { combineReducers } from 'redux';
import houseUpload from 'modules/HouseEdit/reducers';
import passportReducer from 'modules/Passport/reducers';
import houseManage from 'modules/HouseManageList/reducers';

export default combineReducers({
    houseUpload,
    houseManage,
    passportReducer,
});
