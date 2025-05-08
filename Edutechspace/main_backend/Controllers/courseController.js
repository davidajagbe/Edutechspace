import supabase from '../config/supabase.js';


export const getCourses = async (req, res) => {
  console.log('getCourses: Fetching courses');
  try {
    const { data, error } = await supabase.from('courses').select('*');
    if (error) {
      console.error('getCourses: Supabase error:', error.message);
      throw new Error(error.message);
    }

    console.log('getCourses: Data:', data);
    res.json(data);
  } catch (err) {
    console.error('getCourses: Error:', err.message);
    res.status(400).json({ error: err.message });
  }
};