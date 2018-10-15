import photosActions from '../constants/photosActions';

const initialState = {
    chosenPhoto: null,
    photoToSend: null
};

export function photos (state = initialState, action) {

    let newState = {...state};
    switch (action.type) {
        case photosActions.SET_CHOSEN_PHOTO:
            newState.chosenPhoto = action.chosenPhoto;
            return newState;
        case photosActions.SET_PHOTO_TO_SEND:
            newState.photoToSend = action.photoToSend;
            return newState;
        default:
            return state
    }
}