import express from "express";
import mongoose from "mongoose";
import authRoutes from "./libs/auth.route";
import userRoutes from "./libs/user.route";
import passport from "./libs/helpers/passport.helper";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI as string);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
