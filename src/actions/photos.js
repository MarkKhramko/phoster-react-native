import photosActions from '../constants/photosActions';

export function setChosenPhoto(chosenPhoto) {
	return { type: hotosActions.SET_CHOSEN_PHOT, chosenPhoto };
}

export function setPhotoToSend(photoToSend) {
	return { type: photosActions.SET_PHOTO_TO_SEND, photoToSend };
}