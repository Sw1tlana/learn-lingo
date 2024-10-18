import { instance } from './authServices';

export const requestGetTeachers = async (page = 1, limit = 10, filteredTeachers = '') => {
  try {
    const response = await instance.get(
      `teachers.json`, {
        params: {
          page,
          limit,
          filter: filteredTeachers
        }
      }
    );
    
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
    console.error('Error fetching teachers:', error);
    throw new Error(error.message || "Failed to fetch teachers");
  }
};