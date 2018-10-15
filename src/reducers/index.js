import { combineReducers } from 'redux';
import { auth } from '../reducers/auth';
import { photos } from '../reducers/photos';
// import { register } from '../reducers/register';

const rootReducer = combineReducers({ 
    auth,
    photos
});

export default rootReducer;