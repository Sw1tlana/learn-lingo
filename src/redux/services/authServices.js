import { createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut } from 'firebase/auth';
import axios from 'axios';
import { saveUser } from './userService'; 
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

  // Валідація даних
  if (!email || !password || !name) {
    throw new Error("Всі поля (email, password, name) є обов'язковими.");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log("User object:", user);

    const token = await user.getIdToken();
    console.log("Токен користувача:", token);
    
    if (!token) {
      throw new Error("Token is null after registration");
    }

    setToken(token); 

    const userPayload = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    };

    console.log("Початок реєстрації...");
    await saveUser(userPayload, token);
    console.log("Користувача збережено.");

    return { ...userPayload, token }; 
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw new Error(error.message || "Failed to register user");
  }
};

export const requestSignIn = async ({ email, password }) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;

    // Отримуємо токен користувача після входу
    const token = await user.getIdToken();
    setToken(token);  // Встановлюємо токен у заголовки axios

    return { uid: user.uid, user, token }; // Повертаємо користувача з токеном
  } catch (error) {
    console.error('Error signing in:', error.message);
    throw new Error(error.message || "Failed to sign in");
  }
};

export const logOutUser = async () => {
  try {
    await signOut(auth);
    clearToken();  
    console.log("User logged out. Token has been cleared.");

    const token = instance.defaults.headers.common['Authorization'];
    console.log("Token after logout:", token);
  } catch (error) {
    console.error("Error during logout:", error.message);
  }
};