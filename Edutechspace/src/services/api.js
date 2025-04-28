import axios from 'axios';

const API_URL = '/api';

const handleError = (error) => {
  console.error('API Error:', error);
  throw error?.response?.data || error.message;
};

export const courseService = {
  getCourses: async () => {
    try {
      const response = await axios.get(`${API_URL}/courses`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  getCourseById: (id) => axios.get(`${API_URL}/courses/${id}`),
  createCourse: async (courseData) => {
    const response = await axios.post(`${API_URL}/courses`, courseData);
    return response.data;
  },
  updateCourse: async (id, courseData) => {
    const response = await axios.put(`${API_URL}/courses/${id}`, courseData);
    return response.data;
  },
  deleteCourse: async (id) => {
    await axios.delete(`${API_URL}/courses/${id}`);
  },
  updateProgress: (userId, courseId, progress) => 
    axios.post(`${API_URL}/progress`, { userId, courseId, progress }),
  updateUserProfile: (userId, data) =>
    axios.put(`${API_URL}/users/${userId}`, data),
  getWeeklyGoals: (userId) => 
    axios.get(`${API_URL}/goals/${userId}`),
  setWeeklyGoal: (userId, goal) =>
    axios.post(`${API_URL}/goals`, { userId, goal })
};