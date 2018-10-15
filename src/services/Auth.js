import Axios from 'axios';
import { AsyncStorage , Alert } from 'react-native';
import * as APIConst from '../constants/API'

function saveToken(token){
    AsyncStorage.setItem('token', token);
}

function getToken(){
    const token = AsyncStorage.getItem('token');
    return token;
}

async function logout(){
    try {
      await AsyncStorage.removeItem('token');
      return true;
    }
    catch(exception) {
        console.log(exception.message);
      return false;
    }
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

export const Auth = {
    login,
    register,

    getToken,
    logout
};