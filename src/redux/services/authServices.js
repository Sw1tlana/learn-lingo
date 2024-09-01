
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://teachersapp-72029-default-rtdb.europe-west1.firebasedatabase.app/',
});

export const setToken = (token) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
    delete instance.defaults.headers.common.Authorization;
};

export const requestSignUp = async (formData) => {
    const { data } = await instance.post('/users/signup', formData);
    return data;
};


export const requestSignIn = async (formData) => {
    const { data } = await instance.post('/users/login', formData);
    return data;
};


export const requestGetCurrentUser = async () => {
    const { data } = await instance.get('/users/current');

    return data;
};

export const requestLogOut = async () => {
    const { data } = await instance.post('/users/logout');

    return data;
};



export default instance;