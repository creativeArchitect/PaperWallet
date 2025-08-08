import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const getPasswordHash = async (plainTextPassword: string) => {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(plainTextPassword, saltRounds);
        return hash;
      } catch (err) {
        console.error("Error hashing password:", err);
        throw err; // propagate error
      }
};

export const validateUser = async (email: string, plainTextPassword: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return false; // no user found, validation fails

    const isValid = await bcrypt.compare(plainTextPassword, user.password);
    return isValid;
  } catch (err) {
    console.error("Error validating user:", err);
    return false;
  }
};

export const getJWT = (email: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT secret is not defined in environment variables");
  }

  const token = jwt.sign({ email }, secret, { expiresIn: "3d" });
  return token;
};

export const validateToken = (token: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT secret is not defined in environment variables");
  }

  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};
