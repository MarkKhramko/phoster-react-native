import Axios from 'axios';
import { AsyncStorage , Alert } from 'react-native';
import * as APIConst from '../constants/API'

export const Auth = {
    login,
    register
};

function saveToken(token){
    AsyncStorage.setItem('token', token);
}

function removeToken(){
    AsyncStorage.removeItem('token');
}

function login(nickname, password) {
    const url = APIConst.LOGIN;
    const data = {
        username: nickname,
        password: password
    }

    return new Promise((resolve, reject)=>{
        Axios.post(url, data)
        .then((response)=>{
            saveToken(response.data.token);
            return resolve(response);
        })
        .catch((error)=>{
            return reject(error);
        });
    });
}

function register(nickname, password) {

    const url = APIConst.REGISTER;
    const data = {
        username: nickname,
        password: password
    }

    return new Promise((resolve, reject)=>{
        Axios.post(url, data)
        .then((response)=>{
            saveToken(response.data.token);
            return resolve(response);
        })
        .catch((error)=>{
            return reject(error);
        });
    });
}

// function logout() {
//     return dispatch => {
//         AsyncStorage.removeItem('token');
//         dispatch(success())
//         return true
// }