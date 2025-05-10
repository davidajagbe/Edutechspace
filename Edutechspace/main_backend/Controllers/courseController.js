import supabase, { supabaseAdmin } from "../config/supabase.js";
import { AppError } from "../middleware/errorHandler.js";

export const getCourses = async (req, res) => {
  try {
    const { data, error } = await supabase.from("courses").select("id, name");
    if (error) {
      throw new Error(error.message);
    }
    if (data.length == 0) return res.json({ message: "no courses available" });

    res.json(data);
  } catch (err) {
    console.error("getCourses: Error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const enrollUserInCourse = async (req, res, next) => {
  const { userId } = req.user;

  const { courseId } = req.body;

  if (!courseId) throw new AppError("Course id must be provided", 400);

  try {
    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select("name")
      .eq("id", courseId)
      .single();

    if (courseError) {
      throw new Error(courseError.message);
    }

    if (!courseData) {
      throw new AppError("Course not found", 404);
    }

    const { data, error } = await supabaseAdmin
      .from("courses_enrolled")
      .insert([
        {
          user_id: userId,
          course_id: courseId,
          progress_percentage: 0,
          completed: false,
        },
      ]).select(`
      progress_percentage,
      completed,
      created_at,
      courses(name)
      `);

    if (error) {
      throw new AppError(error.message);
    }

    return res
      .status(201)
      .json({ message: "User enrolled successfully", data });
  } catch (err) {
    next(err);
  }
};

export const getUserEnrolledCourses = async (req, res, next) => {
  const { userId } = req.user;
  try {
    const { data, error } = await supabaseAdmin
      .from("courses_enrolled")
      .select(
        `
        id,
        progress_percentage,
        completed,
        created_at,
        courses (
          id,
          name
        )
      `
      )
      .eq("user_id", userId);

    if (error) {
      throw new AppError(error.message);
    }

    if (!data || data.length === 0) {
      return res
        .status(200)
        .json({ message: "No courses enrolled yet", data: [] });
    }

    return res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};
