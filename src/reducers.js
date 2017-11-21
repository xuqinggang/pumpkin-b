import { combineReducers } from 'redux';
import houseUpload from 'modules/HouseEdit/reducers';
import roomStatusChangeDialog from 'modules/HouseManageList/reducers';

export default combineReducers({
    houseUpload,
    roomStatusChangeDialog,
});
