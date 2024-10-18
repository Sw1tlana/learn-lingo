import { instance } from './authServices'; 
import { registerUser } from './authServices';

export const saveUser = async (user) => {

    if (!user || !user.uid || !user.email) {
    throw new Error("Invalid user object");
  }
  
  const token = await user.getIdToken();

  try {
    const response = await instance.put(`/users/${user.uid}.json`, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

export const getCurrentUser = () => {
  const user = auth.currentUser;
  if (user) {
    return user;
  } else {
    throw new Error('No user is currently logged in');
  }
};

export const registerUserAndSave = async (userData) => {
  const { email, password, name } = userData;

  const { user } = await registerUser({ email, password, name });

  return user;

};