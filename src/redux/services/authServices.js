import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut } 
  from 'firebase/auth';
import axios from 'axios';
import { auth } from '../../firebase';

export const instance = axios.create({
  baseURL: 'https://teachersapp-dd91b-default-rtdb.europe-west1.firebasedatabase.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setToken = (token) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common['Authorization'] = '';
};

export const registerUser = async ({ email, password, name }) => {
  if (!email || !password || !name) {
    throw new Error('Required fields are missing');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const idToken = await user.getIdToken();

    setToken(idToken);

    const userEndpoint = `/users/${user.uid}.json?auth=${idToken}`;

    const userResponse = await instance.post(userEndpoint, {
      email,
      name,
      uid: user.uid
    });

    window.location.href = '/';

    return {
      firebaseUser: { uid: user.uid, email },
      backendResponse: userResponse.data
    };
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message || 'Failed to register user');
  }
};

export const requestSignIn = async ({ email, password }) => {
  
  if (!email || !password) {
    throw new Error('Email or password is required.');
  }

  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;

    const token = await user.getIdToken();

    setToken(token); 
    window.location.href = '/teachers';
    return { uid: user.uid, user, token };
  } catch (error) {

    throw new Error(error.message || "Failed to sign in");
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

export const logOutUser = async () => {
  try {
    await signOut(auth);
    clearToken(); 

    window.location.href = '/';
  } catch (error) {
    throw new Error("Error during logout");
  }
};

