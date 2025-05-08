import supabase, { supabaseAdmin } from "../config/supabase.js";
import { AppError } from "../middleware/errorHandler.js";

export const getProfile = async (req, res, next) => {
  try {
    console.log("getProfile: req.user:", req.user);
    if (!req.user || !req.user.userId) {
      throw new AppError("Not authorized, user not found", 401);
    }

    const { userId } = req.user;
    const { data, error } = await supabase
      .from("users")
      .select(
        "id, name, email, picture, ongoingcourses, completedcourses, phone"
      )
      .eq("id", userId)
      .single();

    if (error) {
      throw new AppError(error.message, 400);
    }

    if (!data) {
      throw new AppError("User not found", 404);
    }

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    if (!req.user || !req.user.userId) {
      throw new AppError("Not authorized, user not found", 401);
    }

    const { userId } = req.user;
    const { name, email, phone, password, ongoingcourses, completedcourses } =
      req.body;

    const { data, error } = await supabase
      .from("users")
      .update({
        name,
        email,
        phone,
        password,
        ongoingcourses,
        completedcourses,
      })
      .eq("id", userId)
      .select(
        "id, name, email, picture, ongoingcourses, completedcourses, password, phone"
      )
      .single();

    if (error) {
      throw new AppError(error.message, 400);
    }

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const deleteProfile = async (req, res, next) => {
  try {
    if (!req.user || !req.user.userId) {
      throw new AppError("Not authorized, user not found", 401);
    }

    const { userId } = req.user;

    const { error: dbError } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    if (dbError) {
      console.log("here")
      throw new AppError(dbError.message, 400);
    }

    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (authError) {
      console.log(authError)
      throw new AppError(authError.message, 400);
    }

   return res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    next(err);
  }
};