import { auth } from '../../firebase';
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://teachersapp-dd91b-default-rtdb.europe-west1.firebasedatabase.app/',
});

export const setToken = (token) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common['Authorization'] = '';
};

export const registerUser = async ({ email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const idToken = await user.getIdToken();
  return { user, idToken };
};

export const requestSignIn = async ({ email, password }) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  const user = response.user;
  const token = await user.getIdToken();
  return { user, token };
};

export const logOutUser = async () => {
  await signOut(auth);
  clearToken();
};

