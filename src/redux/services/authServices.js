import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import axios from 'axios';
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

  if (!email || !password || !name) {
    throw new Error("Всі поля (email, password, name) є обов'язковими.");
  }

  try {
    console.log("Registering user with data:", userData); // Логування введених даних
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const token = await user.getIdToken();
    
    if (!token) {
      throw new Error("Token is null after registration");
    }

    setToken(token);

    const userPayload = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    };

    // Збереження користувача у базі даних
    const savedUser = await saveUser(userPayload, token);
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
    const token = await user.getIdToken();
    
    setToken(token); 

    return { uid: user.uid, user, token };
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
  } catch (error) {
    console.error("Error during logout:", error.message);
  }
};

export const saveUser = async (userPayload, token) => {
  try {
    console.log("Saving user data:", userPayload); // Логування даних користувача
    const response = await instance.post(`users/${userPayload.uid}.json`, userPayload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving user:', error.message);
    throw new Error(error.message || "Failed to save user");
  }
};