import { userConst } from '../constants/userConst';

const initialState = {
    addRequest: false,
    addSuccess: false,
    photosGet: false,
    photosRequest: false,
    photos: [],
    id: '',
    link: ''
};

export function photos (state = initialState, action) {
    switch (action.type) {
        case userConst.GET_REQUEST:
            return {
                ...state,
                photosRequest: true
            };
        case userConst.GET_SUCCESS:
            return {
                ...state,
                photosGet: true,
                photos: action.tasks
            };
        case userConst.GET_FAILURE:
            return {};
        case userConst.ADD_REQUEST:
            return {
                ...state,
                addRequest: true
            };
        case userConst.ADD_SUCCESS:
            return {
                ...state,
                addSuccess: true 
            };
        case userConst.ADD_FAILURE:
            return {};       
        case userConst.SELECT_TASK:
            return {
                ...state,
                link: action.link,
                id: action.id
            }      
        default:
            return state
    }
}