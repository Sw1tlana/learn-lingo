
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { app } from '../../firebase/config';

const auth = getAuth(app);

const instance = axios.create({
    baseURL: 'https://teachersapp-72029-default-rtdb.europe-west1.firebasedatabase.app/'
});

export const setToken = (token) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
}


export const clearToken = () => {
    instance.defaults.headers.common.Authorization = '';
}

export const registerUserAndSave = async ({ email, password, name }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const response = await instance.post('/users/${user.uid}.json', {
      email: email,
      name: name,
      uid: user.uid
    });

    return {
      firebaseUser: user,
      backendResponse: response.data
    };
  } catch (error) {
    console.error('Error during registration:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : error.message);
  }
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