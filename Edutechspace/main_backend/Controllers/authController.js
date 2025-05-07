import jwt from "jsonwebtoken";
import supabase from "../config/supabase.js";
import { supabaseAdmin } from "../config/supabase.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    if (!req.body) {
      console.error("login: Request body is missing");
      return res.status(400).json({ error: "Request body is missing" });
    }

    const { email, password } = req.body;
    console.log("login: Attempt:", { email });

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("login: Supabase error:", error.message);
      return res.status(400).json({ error: error.message });
    }

    const { data: userData, error: dbError } = await supabase
      .from("users")
      .select(
        "id, name, email, picture, ongoingcourses, completedcourses, password, phone"
      )
      .eq("email", email)
      .single();

    if (dbError || !userData) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, userData.password);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: userData.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ ...userData, token });
  } catch (err) {
    console.error("login: Server error:", err.message);
    res.status(500).json({ error: "Server error during login" });
  }
};

export const signup = async (req, res) => {
  try {
    if (!req.body) {
      console.error("signup: Request body is missing");
      return res.status(400).json({ error: "Request body is missing" });
    }

    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, phone } },
    });

    if (error) {
      console.error("signup: Supabase error:", error.message);
      return res.status(400).json({ error: error.message });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { error: dbError } = await supabase.from("users").insert(
      {
        id: data.user.id,
        name,
        email,
        phone: phone || null,
        password: hashedPassword,
        ongoingcourses: 0,
        completedcourses: 0,
        picture: null,
      },
      { returning: "representation" }
    );

    if (dbError) {
      console.error("signup: Database insert error:", dbError.message);
      await supabase.auth.admin.deleteUser(data.user.id);
      if (dbError.code == "23505")
        return res
          .status(403)
          .json({ error: "An account with the provided email already exists" });
      return res
        .status(400)
        .json({ error: "Failed to save user data: " + dbError.message });
    }

    const token = jwt.sign({ userId: data.user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({ token });
  } catch (err) {
    console.error("signup: Server error:", err.message);
    res.status(500).json({ error: "Server error during signup" });
  }
};

export const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("logout: Supabase error:", error.message);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("logout: Server error:", err.message);
    res.status(500).json({ error: "Server error during logout" });
  }
};

export const generateToken = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Verify user exists in the users table
    const { data: userData, error: dbError } = await supabase
      .from("users")
      .select(
        "id, name, email, picture, ongoingcourses, completedcourses, password, phone"
      )
      .eq("id", userId)
      .single();

    if (dbError || !userData) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("Genereted Token:", token);
    console.log("JWT secret:", process.env.JWT_SECRET);
    res.status(200).json({ ...userData, token });
  } catch (err) {
    console.error("generateToken: Server error:", err.message);
    res.status(500).json({ error: "Server error during token generation" });
  }
};
