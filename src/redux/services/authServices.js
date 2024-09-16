import axios from 'axios';
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword

} from 'firebase/auth';

import { auth } from '../../firebase';
import { ref, get, set, push } from "firebase/database";
import { database } from "../../firebase";

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
  try {
    const teachersRef = ref(database, 'teachers');
    const snapshot = await get(teachersRef);

    if (snapshot.exists()) {
      console.log('Fetched data:', snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error('Failed to get teachers:', error.message);
    throw new Error(error.message);
  }
};

export const requestAddTeachers = async (teacherData) => {
  try {
    const teachersRef = ref(database, 'teachers');
    const newTeacherRef = push(teachersRef);
    await set(newTeacherRef, teacherData);
    
    return { id: newTeacherRef.key, ...teacherData };
  } catch (error) {
    console.error('Failed to add teacher:', error.message);
    throw new Error(error.message);
  }
};

export const requestDeleteTeachers = async (teacherId) => {
  try {
    const teacherRef = ref(database, `teachers/${teacherId}`);
    await remove(teacherRef);
    
    return teacherId;
  } catch (error) {
    console.error('Failed to delete teacher:', error.message);
    throw new Error(error.message);
  }
};

export default instance;