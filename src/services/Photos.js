import Axios from 'axios';
import Auth from './Auth';
import * as APIConst from '../constants/API'

const axi = (url, token) => {
    const instance = Axios.create({
      baseURL: url,
      headers: {'Authorization': `Bearer ${token}`},
    });
    return instance;
};

function addPhoto( token, title , body , done) {
    
}

async function getPhotos(lastPhotoDate = new Date()) {
    const token = await Auth.getToken();
    if (!!token){
        const url = `${APIConst.PHOTOS}?last_photo_date=${lastPhotoDate}`;
        return axi(url, token).get();
    }
    else{
        return Promise.reject("No token.");
    }
}

const PhotosService = {
    addPhoto,
    getPhotos
};

export default PhotosService;