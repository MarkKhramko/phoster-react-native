export const BACKEND_HOST = "https://phoster.herokuapp.com";
export const API_PREFIX = `${BACKEND_HOST}/api/v1`;

export const REGISTER = `${API_PREFIX}/register`;
export const LOGIN = `${API_PREFIX}/login`;
export const VALIDATE = `${API_PREFIX}/validate`;

const PRIVATE_PREFIX = `${API_PREFIX}/private`;

export const PHOTOS = `${PRIVATE_PREFIX}/photos`;
export const PHOTO_LIKE = `${PRIVATE_PREFIX}/photos/like`;