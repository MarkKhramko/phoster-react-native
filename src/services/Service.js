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

let defaultURL = 'http://10.102.109.195:3000/api/' //office
//let defaultURL = 'http://192.168.1.10:3000/api/'  //home

function login(email, password) {
    return Axios.post( defaultURL + 'Users/login', {
        email: email,
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

function register(email, password) {
    return Axios.post(defaultURL + 'Users' ,  { 
        email: email,
        password: password
    })
    .then(function(response){
        console.log(response)
        return response
    })
    .catch(function (error) {
        console.log(error);
        Alert.alert('Данный пользователь уже существует или введен неправильный email!')
      });
}

function addTask( token, title , body , done) {
    return Axios.post(defaultURL + 'tasks?access_token=' + token,  {
        title: title,
        body: body,
        done: done
    })
    .then(function(response){
        console.log(response)
        getTasks(token)
        return response
    })
    .catch(function (error) {
        console.log(error);
        alert('Ошибка')
      });
}

function getTasks( token ) {
    return Axios.get(defaultURL + 'tasks?access_token=' + token)
    .then(function(response){
        console.log(response)
        return response.data
    })
    .catch(function (error) {
        console.log(error);
        alert('Ошибка')
      });
}

function removeTask(token , id) {
    return Axios.delete(defaultURL +'tasks/' + id + '?access_token=' + token)
    .then(function(response){
        getTasks(token)
        console.log(response)
        return response
    })
    .catch(function (error) {
        console.log(error);
        alert('Ошибка')
      });
}

function editTask(title, body, id, done, token) {
    return Axios.put(defaultURL + 'tasks/' + id + '?access_token=' + token, {
        title: title,
        body: body,
        done: done
    })
        .then(function (response) {
            console.log(response)
            return response
        })
        .catch(function (error) {
            console.log(error);
            alert('Ошибка!') 
        });
}

function editState(title, body, done, id, token) {
    return Axios.put(defaultURL + 'tasks/' + id + '?access_token=' + token, {
        title: title,
        body: body,
        done: done
    })
        .then(function (response) {
            getTasks(token)
            console.log(response)
            return response
        })
        .catch(function (error) {
            console.log(error);
            alert('Ошибка!') 
        });
}
