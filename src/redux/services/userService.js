import { instance } from './authServices'; 
// import { setToken } from './authServices';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const saveUser = async (user, token) => {
  if (!user || !user.uid || !user.email) {
    throw new Error("Invalid user object");
  }

  try {
    const response = await instance.post(`/users/${user.uid}.json`, {
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

// export const registerUserAndSave = async (userData) => {
//     const { email, password, name } = userData;

//     const auth = getAuth();
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Зберігайте лише необхідні дані
//     const userPayload = {
//         uid: user.uid,
//         email: user.email,
//         displayName: name
//     };

//     setToken(await user.getIdToken());
//     await saveUser(userPayload); // Передайте лише серіалізовані дані

//     return userPayload; // Поверніть серіалізовані дані
// };