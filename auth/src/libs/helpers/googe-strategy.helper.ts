import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import User from "../model/user.model";


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/auth/google/callback",
    scope: ['email', 'profile'],
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const { id, emails } = profile;
      let user = await User.findOne({ googleId: id });
      if (!user) {
        const email = emails && emails.length > 0 ? emails[0].value : null;
        user = await User.create({ googleId: id, email });
      }
      done(null, user);
    } catch (error) {
      done(new Error('Google OAuth validation failed'), false);
    }
  }));
