import { getDatabase, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export const saveUser = async (user) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (currentUser) {
    const token = await currentUser.getIdToken(); // Отримати токен
    const db = getDatabase(); // Отримуємо доступ до бази даних
    const userRef = ref(db, 'users/' + currentUser.uid); // Розташування в базі даних

    const userData = {
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName || null, // Додаємо displayName, якщо він є
    };

    try {
      await set(userRef, userData); // Зберігаємо користувача в базі даних
      return userData; // Повертаємо дані користувача
    } catch (error) {
      console.error('Error saving user to database:', error.message);
      throw new Error('Failed to save user data');
    }
  } else {
    throw new Error('Користувача не знайдено');
  }
};

export const registerUserAndSave = async (userData) => {
  const { email, password, name } = userData;
  const auth = getAuth();

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Зберігаємо лише необхідні дані
  const userPayload = {
    uid: user.uid,
    email: user.email,
    displayName: name,
  };

  await saveUser(user); // Передайте фактичний об'єкт користувача
  return userPayload; // Поверніть серіалізовані дані
};