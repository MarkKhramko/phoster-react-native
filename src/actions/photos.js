import photosActions from '../constants/photosActions';

export function setChosenPhoto(chosenPhoto) {
	return { type: photosActions.SET_CHOSEN_PHOTO, chosenPhoto };
}

export function setPhotoToSend(photoToSend) {
	return { type: photosActions.SET_PHOTO_TO_SEND, photoToSend };
}