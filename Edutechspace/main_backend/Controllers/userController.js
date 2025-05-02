import supabase from '../config/supabase.js';

// desc Get User Profile
// http request GET Request
// Access Private
export const getProfile = async (req, res) => {
  console.log('getProfile: req.user:', req.user);
  if (!req.user || !req.user.userId) {
    console.error('getProfile: req.user or req.user.userId is undefined');
    return res.status(401).json({ error: 'Not authorized, user not found' });
  }

  const { userId } = req.user;
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, picture, ongoingcourses, completedcourses, password, phone')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('getProfile: Supabase error:', error.message);
      throw new Error(error.message);
    }

    if (!data) {
      console.error('getProfile: User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('getProfile: Profile data:', data);
    res.status(200).json(data); // Return data directly, not wrapped in { user: data }
  } catch (err) {
    console.error('getProfile: Error:', err.message);
    res.status(400).json({ error: err.message });
  }
};

// desc Update User Profile
// http request PUT Request
// Access Private
export const updateProfile = async (req, res) => {
  console.log('updateProfile: req.user:', req.user);
  if (!req.user || !req.user.userId) {
    console.error('updateProfile: req.user or req.user.userId is undefined');
    return res.status(401).json({ error: 'Not authorized, user not found' });
  }

  const { userId } = req.user;
  const { name, email, phone, password, ongoingcourses, completedcourses } = req.body;
  console.log('updateProfile: Update attempt:', { name, email, phone, password, ongoingcourses, completedcourses });

  try {
    const { data, error } = await supabase
      .from('users')
      .update({ name, email, phone, password, ongoingcourses, completedcourses })
      .eq('id', userId)
      .select('id, name, email, picture, ongoingcourses, completedcourses, password, phone')
      .single();

    if (error) {
      console.error('updateProfile: Supabase error:', error.message);
      throw new Error(error.message);
    }

    console.log('updateProfile: Updated data:', data);
    res.status(200).json(data);
  } catch (err) {
    console.error('updateProfile: Error:', err.message);
    res.status(400).json({ error: err.message });
  }
};

// desc Delete User Profile
// http DELETE Request
// Access PRIVATE
export const deleteProfile = async (req, res) => {
  console.log('deleteProfile: req.user:', req.user);
  if (!req.user || !req.user.userId) {
    console.error('deleteProfile: req.user or req.user.userId is undefined');
    return res.status(401).json({ error: 'Not authorized, user not found' });
  }

  const { userId } = req.user;
  console.log('deleteProfile: Attempting to delete userId:', userId);

  try {
    // Delete dependent records first
    const { error: progressError } = await supabase
      .from('course_progress')
      .delete()
      .eq('user_id', userId);

    if (progressError) {
      console.error('deleteProfile: Course progress delete error:', progressError.message);
      throw new Error(progressError.message);
    }

    // Delete from users table
    const { error: dbError } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (dbError) {
      console.error('deleteProfile: Database delete error:', dbError.message);
      throw new Error(dbError.message);
    }

    // Delete from Supabase auth
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);
    if (authError) {
      console.error('deleteProfile: Supabase auth delete error:', authError.message);
      throw new Error(authError.message);
    }

    console.log('deleteProfile: Account deleted successfully for userId:', userId);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error('deleteProfile: Error:', err.message);
    res.status(400).json({ error: err.message });
  }
};