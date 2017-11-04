import { combineReducers } from 'redux';
import HouseInfoReducers from './RoomInfo/reducers';

export default combineReducers({
    ...HouseInfoReducers,
});
