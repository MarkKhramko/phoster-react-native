import { combineReducers } from 'redux'
import { auth } from '../reducers/auth'
import { register } from '../reducers/register'
import { photos } from '../reducers/photos';

const rootReducer = combineReducers({ 
    auth,
    register,
    photos
}) 

export default rootReducer