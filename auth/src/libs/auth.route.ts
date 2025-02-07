import { Router } from "express";
import { register, login, verifyEmailController } from "./auth.controller";
import passport from "./helpers/passport.helper";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/verify-email", verifyEmailController);


// Google OAuth login route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Google authentication failed" });
    }

    const { user, token } = req.user as any;
    return res.json({
      message: "Successfully authenticated with Google",
      data: {
        token,
        user: {
          email: user.email,
          googleId: user.googleId,
        },
      },
    });
  }
);

export default router;

