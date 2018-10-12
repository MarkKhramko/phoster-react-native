import {Service} from '../services/Service'
import { userConst } from '../constants/userConst'
import { AsyncStorage } from 'react-native';

export const Actions = {
    login,
    logout,
    register,
    getTasks,
    removeTask,
    editTask,
    editState,
    addTask,
    changeTaskBody,
    changeTaskTitle,
    showSelectImage
};

function register(email, password) {{
        request();

       return Service.register(email, password)
            .then(
                user => {
                    if (typeof (user) !== 'undefined') {
                        success();
                        return user
                    }
                },
                error => {
                    failure(error);
                    console.log(error)
                }
            );
}

    function request() { return { type: userConst.REGISTER_REQUEST } }
    function success() { return { type: userConst.REGISTER_SUCCESS } }
    function failure(error) { return { type: userConst.REGISTER_FAILURE, error } }
}


function login(email, password) {
    return dispatch => {
        dispatch(request());

        return Service.login(email, password)
            .then(
                user => {
                    if (typeof (user) !== 'undefined') {
                        dispatch(success(email));
                        return user
                    }
                },
                error => {
                    dispatch(failure(error));
                    console.log(error)
                }
            );
    }

    function request() { return { type: userConst.LOGIN_REQUEST } }
    function success(user) { return { type: userConst.LOGIN_SUCCESS, email } }
    function failure(error) { return { type: userConst.LOGIN_FAILURE, error } }
}

function getTasks(token) {
    return dispatch => {
        dispatch(request());

    return Service.getTasks(token)
        .then(
            tasks => {
                if (typeof (tasks) !== 'undefined') {
                    dispatch(success(tasks));
                    return tasks
                }
            },
            error => {
                dispatch(failure(error));
                console.log(error)
            }
        );
}

function request() { return { type: userConst.GET_REQUEST } }
function success(tasks) { return { type: userConst.GET_SUCCESS, tasks } }
function failure(error) { return { type: userConst.GET_FAILURE, error } }
}


function removeTask(token, id) {{
    request();

    return Service.removeTask(token, id)
        .then(
            response => {
                console.log(response)
                if (typeof (response) !== 'undefined') {
                    success(id);
                    return response
                }
            },
            error => {
                failure(error);
                console.log(error)

            }
        );
}

function request() { return { type: userConst.REMOVE_REQUEST } }
function success(id) { return { type: userConst.REMOVE_SUCCESS, id } }
function failure(error) { return { type: userConst.REMOVE_FAILURE, error } }
}


function editTask(title, body, id, done, token) {{
    request();

    return Service.editTask(title, body, id, done, token)
        .then(
            response => {
                console.log(response)
                if (typeof (response) !== 'undefined') {
                    success(response);
                    return response
                }
            },
            error => {
                failure(error);
                console.log(error)
            }
        );
}

function request() { return { type: userConst.EDIT_REQUEST } }
function success(response) { return { type: userConst.EDIT_SUCCESS, response } }
function failure(error) { return { type: userConst.EDIT_FAILURE, error } }
}


function editState(title, body, done, id , token) {{
    request();

    return Service.editState(title, body, done, id , token)
        .then(
            response => {
                console.log(response)
                if (typeof (response) !== 'undefined') {
                    success(response);
                    return response
                }
            },
            error => {
                failure(error);
                console.log(error)
            }
        );
}

function request() { return { type: userConst.STATE_REQUEST } }
function success(response) { return { type: userConst.STATE_SUCCESS, response } }
function failure(error) { return { type: userConst.STATE_FAILURE, error } }
}

function addTask(token, title, body, done ) {
    return dispatch => {
        dispatch(request());

    return Service.addTask(token, title, body, done)
        .then(
            response => {
                console.log(response)
                if (typeof (response) !== 'undefined') {
                    dispatch(success(response));
                    return response
                }
            },
            error => {
                dispatch(failure(error));
                console.log(error)
            }
        );
    }

function request() { return { type: userConst.ADD_REQUEST } }
function success(response) { return { type: userConst.ADD_SUCCESS, response } }
function failure(error) { return { type: userConst.ADD_FAILURE, error } }
}

function showSelectImage(link, id) {
    return dispatch => {
        dispatch(selectImage(link, id))
    }
function selectImage(link, id) { return { type: userConst.SELECT_TASK, link, id}}   
}

function changeTaskTitle(title) {
    return dispatch => {
        dispatch(showTaskAction(title))
    }
function showTaskAction(title) { return { type: userConst.CHANGE_TITLE, title } }
}

function changeTaskBody(body) {
    return dispatch => {
        dispatch(showTaskAction(body))
    }  
function showTaskAction(body) { return { type: userConst.CHANGE_BODY, body } }
}

function logout() {
    return dispatch => {
        AsyncStorage.removeItem('token');
        dispatch(success())
        return true
}
function success() { return { type: userConst.LOGOUT } }
}