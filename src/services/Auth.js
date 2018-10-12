import Axios from 'axios';
import { AsyncStorage , Alert } from 'react-native';

export const Service = {
    login,
    register,
    addTask,
    getTasks,
    removeTask,
    editTask,
    editState
};

function login(nickname, password) {
    return Axios.post( defaultURL + 'Users/login', {
        nickname: nickname,
        password: password
    })
    .then(function(response){
        AsyncStorage.setItem('token', response.data.id)
        console.log(response)
        return response
    })
    .catch(function (error) {
        console.log(error);
        Alert.alert('Неправильный логин или пароль!')
    });
}

function register(nickname, password) {
    return Axios.post(defaultURL + 'Users' ,  { 
        nickname: nickname,
        password: password
    })
    .then(function(response){
        console.log(response)
        return response
    })
    .catch(function (error) {
        console.log(error);
        Alert.alert('Данный пользователь уже существует или введен неправильный nickname!')
      });
}