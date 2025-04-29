import supabase from '../config/supabase.js';

export const getProfile = async (req, res) => {
  const { userId } = req.user;
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw new Error(error.message);

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  const { userId } = req.user;
  const { name, email, ongoingCourses, completedCourses } = req.body;
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ name, email, ongoingCourses, completedCourses })
      .eq('id', userId)
      .single();
    if (error) throw new Error(error.message);

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProfile = async (req, res) => {
  const { userId } = req.user;
  try {
    await supabase.auth.admin.deleteUser(userId);
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};