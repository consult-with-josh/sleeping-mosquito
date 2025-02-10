import { Request, Response } from "express";
import { registerUser, loginUser, verifyEmail } from "./auth.service";
import passport from "passport";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body.email, req.body.username, req.body.password);
    res.status(201).json({
      status: "success",
      message: "User registered. Check your email to verify your account.",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body.email, req.body.password);
    res.status(200).json({
      status: "success",
      message: "Login successful.",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

export const verifyEmailController = async (req: Request, res: Response) => {
  try {
    const result = await verifyEmail(req.query.token as string);
    res.status(200).json({
      status: "success",
      message: "Email verified successfully.",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

// Google Authentication
export const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

export const googleAuthCallback = (req: Request, res: Response) => {
  passport.authenticate("google", (err: any, user: { user: any; token: any; } | false, info: any) => {
    if (err || !user) {
      return res.status(401).json({ message: "Google authentication failed", error: err || info });
    }

    return res.json({
      message: "Google authentication successful",
      user: user.user,
      token: user.token,
    });
  })(req, res);
};