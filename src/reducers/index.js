import { combineReducers } from 'redux'
import {auth} from '../reducers/auth'
import {register} from '../reducers/register'
import {tasks} from '../reducers/notes';
import undoable from 'redux-undo';

const rootReducer = combineReducers({ 
    auth,
    register,
    tasks
}) 

export default rootReducer