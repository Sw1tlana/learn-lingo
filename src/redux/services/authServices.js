import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut } 
  from 'firebase/auth';
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

export const registerUser = async ({ email, password, name }) => {
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
      uid: user.uid
    });

    return {
      firebaseUser: { uid: user.uid, email },
      backendResponse: userResponse.data
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

    return { uid: user.uid, user, token };
  } catch (error) {
    console.error('Error signing in:', error.message);
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
    console.log("User logged out. Token has been cleared.");
  } catch (error) {
    console.error("Error during logout:", error.message);
  }
};

