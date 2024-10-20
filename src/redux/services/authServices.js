import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import axios from 'axios';
import { saveUser } from './userService'; 
// import { auth } from '../../firebase'; 
// import { ref, set } from 'firebase/database';
import { auth } from '../../firebase';

export const instance = axios.create({
  baseURL: 'https://teachersapp-dd91b-default-rtdb.europe-west1.firebasedatabase.app/',
});

export const setToken = (token) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common['Authorization'] = '';
};


export const registerUser = async (userData) => {
  const { email, password, name } = userData;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const token = await user.getIdToken();

    const userPayload = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    };

    // Зберігаємо користувача, використовуючи saveUser
    await saveUser(userPayload, token);

    return userPayload; 
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw new Error(error.message || "Failed to register user");
  }
};

export const requestSignIn = async ({ email, password }) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;
    const token = await user.getIdToken();

    setToken(token);

    return { uid: user.uid, user, token };
  } catch (error) {
    console.error('Error signing in:', error.message);
    throw new Error(error.message || "Failed to sign in");
  }
};

export const logOutUser = async () => {
  await signOut(auth);
  clearToken();
};