
const validateCourse = (req, res, next) => {
  const { title, description, duration } = req.body;
  
  if (!title || !description || !duration) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  next();
};

module.exports = {
  validateCourse
};
