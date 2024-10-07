import axios from 'axios';
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword

} from 'firebase/auth';

import { auth } from '../../firebase';

const instance = axios.create({
  baseURL: 'https://teachersapp-dd91b-default-rtdb.europe-west1.firebasedatabase.app/',

});

export const setToken = (token) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common['Authorization'] = ''; 
};

export const registerUserAndSave = async ({ email, password, name }) => {
  if (!email || !password || !name) {
    throw new Error('Required fields are missing');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    
    const userEndpoint = `/users/${user.uid}.json?auth=${idToken}`;
    
    const userResponse = await instance.post(userEndpoint, {
      email,
      name,
      token: idToken,
      uid: user.uid
    });

    return {
      firebaseUser: { uid: user.uid, email },
      backendResponse: userResponse.data,
      token: idToken
    };
  } catch (error) {
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
      uid: user.uid,
      token
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const requestGetCurrentUser = async () => {
  const user = auth.currentUser;

  if (user) {
    return user;
  } else {
    throw new Error('No user is currently logged in');
  }
};

export const requestLogOut = async () => {
  try {
    await signOut(auth);
    
    clearToken();
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};

// teachers

export const requestGetTeachers = async (page, limit) => {

  try {

  const response = await instance.get(`teachers.json?page=${page}&limit=${limit}`);

    if (response.data) {
      const teachersArray = Object.keys(response.data).map(key => ({
        id: key,
        ...response.data[key]
      }));

      const totalItems = teachersArray.length;
      const totalPages = Math.ceil(totalItems / limit); 

      const paginatedTeachers = teachersArray.slice((page - 1) * limit, page * limit);
      return {
        teachers: paginatedTeachers,
        totalPages: totalPages
      };
    }

    return { teachers: [], totalPages: 0 };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default instance;