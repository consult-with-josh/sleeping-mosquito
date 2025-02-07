import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import passport from "passport";
import User from "../model/user.model";

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "User not found" });

      if (!user.password) return done(null, false, { message: "Password not set" });

      const isMatch = await bcrypt.compare(password, user.password!);
      return isMatch ? done(null, user) : done(null, false, { message: "Invalid credentials" });
    } catch (error) {
      return done(error);
    }
  })
);
