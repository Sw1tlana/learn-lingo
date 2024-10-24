import { instance } from './authServices';
import { store } from '../stores';

export const requestGetTeachers = async (page = 1, limit = 10) => {
  try {

    const state = store.getState();
    const token = state.auth.token;
    
    console.log('Токен авторизації:', token);
    if (!token) {
      throw new Error('No authorization token found');
    }

    const response = await instance.get(
      `teachers.json`, {
        params: {
          page,
          limit,
          filter: 'simpleValue'
        }
  });
    console.log('Response from teachers API:', response.data);
    
    if (!response.data) {
      return { teachers: [], totalPages: 0 };
    }

    const teachersArray = Object.keys(response.data).map(key => ({
      id: key,
      ...response.data[key]
    }));

    const totalItems = teachersArray.length;
    const totalPages = Math.ceil(totalItems / limit);
    const paginatedTeachers = teachersArray.slice((page - 1) * limit, page * limit);

    return {
      teachers: paginatedTeachers,
      totalPages
    };
  } catch (error) {
    console.error('Error fetching teachers:', error.response ? error.response.data : error.message);
    throw new Error(error.message || "Failed to fetch teachers");
  }
};