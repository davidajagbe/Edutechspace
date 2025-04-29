import supabase from '../config/Superbase-client.js';

export const getCourseProgress = async (req, res) => {
  const { userId } = req.params;
  try {
    const { data, error } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', userId);
    if (error) throw new Error(error.message);

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const { data, error } = await supabase.from('courses').select('*');
    if (error) throw new Error(error.message);

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// export const uploadResource = async (req, res) => {
//   const { userId } = req.user;
//   const { file } = req.body; // Assume file is sent as base64 or use a file upload middleware
//   try {
//     const { data, error } = await supabase.storage
//       .from('resources')
//       .upload(`user-${userId}-${Date.now()}`, file);
//     if (error) throw new Error(error.message);

//     res.json({ message: 'Resource uploaded successfully', data });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };