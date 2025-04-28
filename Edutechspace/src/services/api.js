
const API_URL = 'http://localhost:5000/api';

export const courseService = {
  // Get all courses
  getAllCourses: async () => {
    const response = await fetch(`${API_URL}/courses`);
    return response.json();
  },

  // Get single course
  getCourse: async (id) => {
    const response = await fetch(`${API_URL}/courses/${id}`);
    return response.json();
  },

  // Create course
  createCourse: async (courseData) => {
    const response = await fetch(`${API_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });
    return response.json();
  },

  // Update course
  updateCourse: async (id, courseData) => {
    const response = await fetch(`${API_URL}/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });
    return response.json();
  },

  // Delete course
  deleteCourse: async (id) => {
    await fetch(`${API_URL}/courses/${id}`, {
      method: 'DELETE',
    });
  },
};
