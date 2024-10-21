import { instance } from './authServices'; 
// import { setToken } from './authServices';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const saveUser = async (userPayload, token) => {
  try {
    const response = await instance.post(`/users/${userPayload.uid}.json`, userPayload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error; // Зберігаємо помилку для подальшої обробки
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