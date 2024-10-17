import { instance } from './authServices'; 

export const saveUser = async (user, token, name) => {
  const userEndpoint = `/users/${user.uid}.json?auth=${token}`;
  
  const response = await instance.post(userEndpoint, {
    email: user.email,
    name,
    token,
    uid: user.uid,
  });
  
  return response.data;
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

  const { user, idToken } = await registerUser({ email, password });
  const savedUser = await saveUser(user, idToken, name);

  return savedUser;
};