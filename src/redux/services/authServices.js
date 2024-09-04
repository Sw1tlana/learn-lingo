import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

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
   console.log('Token cleared', instance.defaults.headers.common.Authorization); 
}

export const registerUserAndSave = async ({ email, password, name }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const response = await instance.post(`/users/${user.uid}.json`, {
      email: email,
      name: name,
      uid: user.uid
    });

    return {
      firebaseUser: user,
      backendResponse: response.data
    };
};

export const requestSignIn = async ({ email, password }) => {
    console.log('requestSignIn called with:', { email, password });
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        return { token, email };
    } catch (error) {
        console.error('SignIn Error:', error.code, error.message);
        throw new Error(error.message);
    }
};

export const requestGetCurrentUser = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
        return {
            name: user.displayName,
            email: user.email,
            uid: user.uid
        };
    } else {
        throw new Error('No user is currently logged in');
    }
};

export const requestLogOut = async () => {
    const auth = getAuth();
    try {
        await signOut(auth);
         console.log('Successfully signed out');
        return { success: true };
    } catch (error) {
        console.error('Logout Error:', error.message);
        throw new Error(error.message);
    }
};



export default instance;