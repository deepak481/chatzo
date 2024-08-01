import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 32,
      index: true,
    },
    firstname: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 32,
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: 3,
      maxlength: 32,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 32,
      index: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      maxlength: 1024,
      required: [true, "Password is required"],
    },
    agreeTermConditions: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default:
        "https://img.icons8.com/?size=100&id=ywULFSPkh4kI&format=png&color=000000",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this.id,
      username: this.username,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const User = model("User", userSchema);
