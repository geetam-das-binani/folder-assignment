import { ErrorHandler } from "../utils/error.mjs";
import { catchAsyncErrors } from "../utils/catchAsyncErrors.mjs";
import { User } from "../models/user.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const registerHandler = catchAsyncErrors(async (req, res, next) => {
  let user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  if (user) {
    return next(new ErrorHandler("user already exists", 400));
  }

  const newUser = await User.create(req.body);

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const userWithoutPassword = await User.findById(newUser._id).select(
    "-password"
  );
  res
    .status(201)
    .cookie("ftoken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message: "Registration Successful",
      userWithoutPassword,
    });
});

export const loginHandler = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email }).select("+password");

  if (!existingUser) {
    return next(new ErrorHandler("Invalid credentials", 400));
  }
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid credentials", 400));
  }

  const userWithoutPassword = await User.findById(existingUser._id).select(
    "-password"
  );
  const token = jwt.sign(
    { id: userWithoutPassword._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res
    .status(200)
    .cookie("ftoken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message: `Sign In Successful`,
      userWithoutPassword,
    });
});

export const logoutHandler = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("ftoken", "", {
      maxAge: 0,
    })
    .json({
      success: true,
      message: "Logged Out",
    });
});


export const loadAuthUser=catchAsyncErrors(async(req,res,next)=>{
  const user=await User.findById(req.user._id).select("-password")
  res.status(200).json({user})
})