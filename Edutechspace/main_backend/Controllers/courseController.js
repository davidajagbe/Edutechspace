import supabase from '../config/supabase.js';


export const getCourses = async (req, res) => {
  try {
    const { data, error } = await supabase.from('courses').select('name');
    if (error) {
      throw new Error(error.message);
    }
    if(data.length == 0) return res.json({message: "no courses available"})

    res.json(data);
  } catch (err) {
    console.error('getCourses: Error:', err.message);
    res.status(400).json({ error: err.message });
  }
};