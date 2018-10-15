import Axios from 'axios';
import Auth from './Auth';
import * as APIConst from '../constants/API';

const axi = (url, token, data, miltipart=false) => {
    const instance = Axios.create({
        baseURL: url,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': miltipart === true ? 'multipart/form-data' : 'application/json'
        },
        data: data
    });
    return instance;
};

async function sendPhoto(photoData) {
    const token = await Auth.getToken();
    if (!!token){
        // Create file date
        const formData = new FormData();
        const uri = photoData.uri;
        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append("file1", {
            uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        });

        const url = `${APIConst.PHOTOS}`;
        
        const options = {
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        };

        try{
            const rawResponse = await fetch(url, options);
            return Promise.resolve(rawResponse.json());
        }
        catch(err){
            return Promise.reject(err);
        }
    }
    else{
        return Promise.reject("No token.");
    }
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
    sendPhoto,
    getPhotos
};

export default PhotosService;