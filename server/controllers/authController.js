import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import sendVerificationEmail from "../mailtrap/email.js";

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      throw new Error("All Fields are Required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    generateToken(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  res.send("Log In");
};

const logout = async (req, res) => {
  res.send("Log out");
};

export { signup, login, logout };
