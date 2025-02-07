import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import User from "../model/user.model";
import dotenv from "dotenv";
// import { Strategy as AppleStrategy } from "passport-apple";
import jwt from "jsonwebtoken";
// import fs from "fs";


dotenv.config();


passport.use(new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "User not found" });

      if (!user.password) return done(null, false, { message: "Password not set" });

      const isMatch = await bcrypt.compare(password, user.password!);
      return isMatch ? done(null, user) : done(null, false, { message: "Invalid credentials" });
    } catch (error) {
      return done(error); // Added catch block to handle errors
    }
  }
));



passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URI as string, 
      scope: ["email", "profile"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("No email returned from Google"), false);
        }

        let user = await User.findOne({ googleId });

        if (!user) {
          user = await User.findOne({ email });

          if (!user) {
            user = new User({
              googleId,
              email,
              username: email.split("@")[0],
            });
          } else {
            user.googleId = googleId;
          }

          await user.save();
        }

        // Generate JWT token
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET as string,
          { expiresIn: "1h" }
        );

        return done(null, { user, token });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Serialize user
passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;


