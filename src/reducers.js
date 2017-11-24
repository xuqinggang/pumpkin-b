import { combineReducers } from 'redux';
import houseUpload from 'modules/HouseEdit/reducers';
import roomStatusChangeDialog from 'modules/HouseManageList/reducers';
import passportReducer from 'modules/Passport/reducers';

export default combineReducers({
    houseUpload,
    roomStatusChangeDialog,
    passportReducer,
});
