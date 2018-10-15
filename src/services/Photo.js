import Axios from 'axios';

export const Service = {
    addPhoto,
    getPhotos
};

function addPhoto( token, title , body , done) {
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

function getPhotos( token ) {
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
