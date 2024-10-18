import { auth } from '../../firebase';
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import axios from 'axios';
import { saveUser } from './userService';

export const instance = axios.create({
  baseURL: 'https://teachersapp-dd91b-default-rtdb.europe-west1.firebasedatabase.app/',
});

export const setToken = (token) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common['Authorization'] = '';
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken(true);
        error.config.headers.Authorization = `Bearer ${token}`;
        return axios(error.config);
      }
    }
    return Promise.reject(error);
  }
);

// export const registerUser = async ({ email, password }) => {
//   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//   const user = userCredential.user;
//   const idToken = await user.getIdToken();
//   return { user, idToken };
// };

export const registerUser = async ({ email, password, name }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await saveUser({ ...user, displayName: name });
    
    return { user };
  } catch (error) {

    console.error('Registration error:', error);
    throw new Error(error.message); 
  }
};

export const requestSignIn = async ({ email, password }) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;
    const token = await user.getIdToken();

    // Додайте uid до результату
    const uid = user.uid;

    console.log('User token:', token);
    return { uid, user, token }; // Повертаємо uid разом з user та token
  } catch (error) {
    console.error('Error signing in:', error.message);
    throw new Error(error.message || "Failed to sign in");
  }
};

export const logOutUser = async () => {
  await signOut(auth);
  clearToken();
};

