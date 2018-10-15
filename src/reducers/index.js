import { combineReducers } from 'redux';
import { auth } from '../reducers/auth';
// import { register } from '../reducers/register';
// import { photos } from '../reducers/photos';

const rootReducer = combineReducers({ 
    auth
});

export default rootReducer;