// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true, unique: true },
//   googleId: { type: String, unique: true, sparse: true },
// }, { timestamps: true });

// export default mongoose.model("User", UserSchema);


import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetPasswordToken: { type: String },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
