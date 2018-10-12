import { userConst } from '../constants/userConst';
import undoable, { includeAction } from 'redux-undo';

const initialState = {
    addRequest: false,
    addSuccess: false,
    tasksGet: false,
    taskRequest: false,
    tasks: [],
    editRequest: false,
    removeRequest: false,
    stateRequest: false,
    stateSuccess: false,
    title: '',
    body: '',
    id: '',
    link: '',
    done: false,
};

export function tasks (state = initialState, action) {
    switch (action.type) {
        case userConst.GET_REQUEST:
            return {
                ...state,
                taskRequest: true
            };
        case userConst.GET_SUCCESS:
            return {
                ...state,
                tasksGet: true,
                tasks: action.tasks
            };
        case userConst.GET_FAILURE:
            return {};
        case userConst.ADD_REQUEST:
            return {
                ...state,
                addRequest: true
            };
        case userConst.ADD_SUCCESS:
            return {
                ...state,
                addSuccess: true 
            };
        case userConst.ADD_FAILURE:
            return {};       
        case userConst.REMOVE_REQUEST:
            return {
                ...state,
                removeRequest: true
            };
        case userConst.REMOVE_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.filter(task => action.id !== task.id)
            };
        case userConst.REMOVE_FAILURE:
            return {};
        case userConst.STATE_REQUEST:
            return {
                ...state,
                stateRequest: true 
            };
        case userConst.STATE_SUCCESS:
            return {
                ...state,
                stateSuccess: true 
            };
        case userConst.STATE_FAILURE:
            return {};               
        case userConst.CHANGE_TITLE:
            return {
                ...state,
                title: action.title
            };
        case userConst.CHANGE_BODY:
            return {
                ...state,
                body: action.body
            };
        case userConst.SELECT_TASK:
            return {
                ...state,
                link: action.link,
                id: action.id
            }      
        default:
            return state
    }
}

const undoableTodos = undoable(tasks, { filter: includeAction([userConst.CHANGE_TITLE, userConst.CHANGE_BODY]),
    ignoreInitialState: true,
    neverSkipReducer: false,})

export default undoableTodos