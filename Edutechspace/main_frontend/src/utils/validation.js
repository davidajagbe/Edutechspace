
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateName = (name) => {
  return name.length >= 2 && /^[a-zA-Z\s]*$/.test(name);
};

export const validateCourse = (course) => {
  return {
    title: course.title?.length > 0,
    description: course.description?.length > 0,
    duration: course.duration > 0,
    level: ['beginner', 'intermediate', 'advanced'].includes(course.level)
  };
};
