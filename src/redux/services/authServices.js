import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

import axios from 'axios';
import { app } from '../../firebase';

const auth = getAuth(app);

const instance = axios.create({
  baseURL: 'https://teachersapp-f3d77-default-rtdb.firebaseio.com/',

});

export const setToken = (token) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  console.log('Token set:', instance.defaults.headers.common['Authorization']);
};

export const clearToken = () => {
  delete instance.defaults.headers.common['Authorization'];
  console.log('Token cleared');
};

export const registerUserAndSave = async ({ email, password, name }) => {
  if (!email || !password || !name) {
    throw new Error('Required fields are missing');
  }

  try {
    const response = await instance.post('accounts:signUp', {
      email,
      password,
      returnSecureToken: true
    });

    const { idToken, localId } = response.data;
    console.log('Token received:', idToken);

    // Set token in axios instance headers
    instance.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;

    const userEndpoint = `/users/${localId}.json`;
    const userResponse = await instance.post(userEndpoint, {
      email,
      name,
      token: idToken,
      uid: localId
    });

    console.log('User registered and saved:', userResponse.data);

    return {
      firebaseUser: { uid: localId, email },
      backendResponse: userResponse.data,
      token: idToken
    };
  } catch (error) {
    console.error('Registration Error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.error || error.message || 'Failed to register user');
  }
};


export const requestSignIn = async ({ email, password }) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;
    const token = await user.getIdToken();
    
    setToken(token);

    return {
      firebaseUser: user,
      token
    };
  } catch (error) {
    console.error('Sign In Error:', error.message);
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
    clearToken();
    console.log('Successfully signed out');
    return { success: true };
  } catch (error) {
    console.error('Logout Error:', error.message);
    throw new Error(error.message);
  }
};

export default instance;