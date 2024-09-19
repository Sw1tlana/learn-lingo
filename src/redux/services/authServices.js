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
  console.log('Token set:', instance.defaults.headers.common['Authorization']);
};

export const clearToken = () => {
  instance.defaults.headers.common['Authorization'] = ''; 
  console.log('Token cleared');
};

export const registerUserAndSave = async ({ email, password, name }) => {
  if (!email || !password || !name) {
    throw new Error('Required fields are missing');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const idToken = await user.getIdToken();

    console.log('User UID:', user.uid);
    console.log('ID Token:', idToken);
    
    const userEndpoint = `/users/${user.uid}.json?auth=${idToken}`;
    console.log('User Endpoint:', userEndpoint);
    
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
    console.log('Sign In Response:', { firebaseUser: user, uid: user.uid, token });

    return {
      firebaseUser: user,
      uid: user.uid,
      token
    };
  } catch (error) {
    console.error('Sign In Error:', error.message);
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
    console.log('Successfully signed out from Firebase');
    return { success: true };
  } catch (error) {
    console.error('Logout Error:', error.message);
    throw new Error(error.message);
  }
};

// teachers

export const requestGetTeachers = async () => {
    console.log('Current Headers:', instance.defaults.headers.common['Authorization']);
  try {
    console.log('Starting request to fetch teachers');
  const response = await instance.get('teachers.json');
  console.log('Direct API Response:', response.data);
    console.log('API Response:', response.data);

    if (response.data) {
      const teachersArray = Object.keys(response.data).map(key => ({
        id: key,
        ...response.data[key]
      }));
      console.log('Formatted teachers array:', teachersArray);
      return teachersArray;
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch teachers:', error.message);
    throw new Error(error.message);
  }
};

export const requestAddTeachers = async (teacherData) => {
  try {
    const response = await instance.post('teachers.json', teacherData);
    
    return { id: response.data.name, ...teacherData };
  } catch (error) {
    console.error('Failed to add teacher:', error.message);
    throw new Error(error.message);
  }
};

export const requestDeleteTeachers = async (teacherId) => {
  try {
    await instance.delete(`teachers/${teacherId}.json`);
    console.log(`Teacher ${teacherId} deleted`);
    return teacherId;
  } catch (error) {
    console.error('Failed to delete teacher:', error.message);
    throw new Error(error.message);
  }
};

export default instance;