import { combineReducers } from 'redux';
import houseUpload from 'modules/HouseEdit/reducers';
import houseManage from 'modules/HouseManageList/reducers';

export default combineReducers({
    houseUpload,
    houseManage,
});
