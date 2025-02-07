import { Strategy as AppleStrategy } from "passport-apple";
import passport from "passport";
import User from "../model/user.model";

passport.use(
  new AppleStrategy(
    {
      clientID: process.env.APPLE_CLIENT_ID!,
      teamID: process.env.APPLE_TEAM_ID!,
      keyID: process.env.APPLE_KEY_ID!,
      callbackURL: "/auth/apple/callback",
      scope: ["email", "name"],
      passReqToCallback: true, // Required for AppleStrategy
    },
    async (req, accessToken, refreshToken, idToken, profile, done) => {
      try {
        let user = await User.findOne({ appleId: profile.id });
        if (!user) {
          user = await User.create({
            appleId: profile.id,
            email: profile.email || `user_${profile.id}@apple.com`, // Apple may not return email
          });
        }
        return done(null, user);
      } catch (error: unknown) {
        return done(error instanceof Error ? error : new Error('An unknown error occurred'));
      }
    }
  )
);
