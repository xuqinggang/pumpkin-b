import { combineReducers } from 'redux';
import HouseInfoReducers from './HouseInfo/reducers';

export default combineReducers({
    ...HouseInfoReducers,
});
