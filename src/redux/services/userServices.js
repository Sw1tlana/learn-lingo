import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Функція для отримання даних користувача з бази даних
export const createUserProfile = async (user) => {
  try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
          email: user.email,
          name: user.displayName || "Guest",
          createdAt: new Date(),
      });
      console.log("User profile created:", user.uid);
  } catch (error) {
      console.error("Error creating user profile:", error);
      throw new Error('Failed to create user profile');
  }
};

export const getUserInfoFromDatabase = async (uid) => {
  try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
          return userDoc.data();
      } else {
          console.log('No such document!');
          return null; // Повертаємо null для чіткішої обробки
      }
  } catch (error) {
      console.error('Error getting user info:', error);
      throw new Error('Failed to get user info');
  }
};