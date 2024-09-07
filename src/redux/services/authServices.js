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
    baseURL: 'https://teachersapp-f3d77-default-rtdb.firebaseio.com/'
});

export const setToken = (token) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export const clearToken = () => {
     instance.defaults.headers.common['Authorization'] = '';
    console.log('Token cleared', instance.defaults.headers.common.Authorization); 

}

export const registerUserAndSave = async ({ email, password, name }) => {
    
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const token = await user.getIdToken();
    console.log('Token received:', token); 
    setToken(token);

    const response = await instance.post(`/users/${user.uid}.json`, {
      email: email,
      name: name,
      uid: user.uid
    });

    return {
      firebaseUser: user,
      backendResponse: response.data,
      token: token
    };
  } catch (error) {
    console.error('Error in registerUserAndSave:', error);
    throw new Error(error.response?.data?.error || error.message || 'Failed to register user');
  }
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