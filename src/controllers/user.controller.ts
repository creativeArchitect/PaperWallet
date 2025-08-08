import User from "../models/User.js";
import {
  getJWT,
  getPasswordHash,
  validateUser,
} from "../services/user.service.js";
import AppError from "../utils/error.utils.js";

export const register = async (req: any, res: any, next: any) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    if (!email || !password || !firstName) {
        return next(new AppError("Enter required field values ", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (user) {
      return next(new AppError("user already exists", 409));
    }

    const passwordHash: string = await getPasswordHash(password);

    const resUserData = new User({
      email,
      password: passwordHash,
      firstName,
      lastName,
      role,
    });

    const token = await getJWT(resUserData._id.toString());

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      });

    await resUserData.save();

    res.json({
      success: true,
      message: "user registered successfully.",
      firstName: resUserData.firstName,
      lastName: resUserData.lastName,
      email: resUserData.email,
    });
  } catch (err) {
    console.error("Error in register user:", err);
    return next(new AppError("ERROR: " + err, 400));
  }
};

export const login = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
        return next(new AppError("Enter required field values ", 400));
    }

    const validUserDetails = await validateUser(email, password);

    if (!validUserDetails) {
        return next(new AppError("Invalid email or password", 400));
    }

    const newToken = getJWT(validUserDetails._id.toString());
    res.cookie("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    });

    res.status(200).send({
      success: true,
      message: "user loggedIn successfully...",
    });
  } catch (err) {
    console.error("Error in login user:", err);
    return next(new AppError("ERROR: " + err, 400));
  }
};

export const logout = async (req: any, res: any, next: any) => {
  try {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "logout successfully...",
    });
  } catch (err) {
    console.error("Error in logout user:", err);
    return next(new AppError("ERROR: " + err, 400));
  }
};
