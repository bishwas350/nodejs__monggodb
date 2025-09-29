const mongoose = require("mongoose");
const { Types, Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const coustomError = require("../../utils/coustomError");
const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
  },
  phoneNumber: {
    type: Number,
    trim: true,
    required: [true, "Phone number is required"],
  },
  image: {
    type: String,
    trim: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  phoneNumberVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: Types.ObjectId,
    ref: "role",
  },
  permission: {
    type: Types.ObjectId,
    ref: "permission",
  },
  address: {
    type: String,
    trim: true,
  },
  city: String,
  district: String,
  country: {
    type: String,
    default: "Bangladesh",
  },
  zipCode: {
    type: Number,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    trim: true,
  },
  gender: {
    type: String,
    emun: ["Men", "Female", "Other"],
  },
  cart: {
    type: Types.ObjectId,
    ref: "Product",
  },
  wishlist: {
    type: Types.ObjectId,
    ref: "Product",
  },
  newsletterSubscribed: {
    type: Boolean,
    default: false,
  },
  resetPasswordOtp: Number,
  resetPasswordOtpExpire: Date,
  twoFactorAuthEnabled: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  lastLogIn: Date,
  lastLogOut: Date,
  oauth: Boolean,
  refreshToken: {
    type: String,
    trim: true,
  },
});

// make a hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashPass = await bcrypt.hash(this.password, 10);
    this.password = hashPass;
  }
  next();
});

// compare password
userSchema.methods.comparePassword = async function (humanPass) {
  return await bcrypt.compare(humanPass, this.password);
};

// generate access token
userSchema.methods.generateAccessToken = async function () {
  const accesstoken = await jwt.sign(
    {
      userId: this._id,
      email: this.email,
      role: this.role,
      name: this.name,
    },
    process.env.ACCESSTOKEN_SECRET_KEY,
    { expiresIn: process.env.ACCESSTOKEN_EXPIRE }
  );
  return accesstoken;
};
// generate refresh token
userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign(
    {
      userId: this._id,
    },
    process.env.REFRESHTOKEN_SECRET_KEY,
    { expiresIn: process.env.REFRESHTOKEN_EXPIRE }
  );
  return accesstoken;
};

// verify access token
userSchema.methods.verifyAccessToken = async function (token) {
  const isValiedRefreshToken = await jwt.verify(
    token,
    process.env.REFRESHTOKEN_SECRET_KEY
  );
  if (!isValiedRefreshToken) {
    throw new coustomError(401, "Invalid Refresh Token");
  }
};

module.exports = mongoose.model("User", userSchema);
