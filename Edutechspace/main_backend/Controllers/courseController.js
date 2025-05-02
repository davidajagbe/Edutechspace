import supabase from '../config/supabase.js';

export const getCourseProgress = async (req, res) => {
  const { userId } = req.params;
  console.log('getCourseProgress: userId:', userId);
  try {
    const { data, error } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', userId);
    if (error) {
      console.error('getCourseProgress: Supabase error:', error.message);
      throw new Error(error.message);
    }

    console.log('getCourseProgress: Data:', data);
    res.json(data);
  } catch (err) {
    console.error('getCourseProgress: Error:', err.message);
    res.status(400).json({ error: err.message });
  }
};

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