// import { Request, Response } from "express";
// import { registerUser, loginUser } from "./auth.service";
// import passport from "passport";

// export const register = async (req: Request, res: Response) => {
//   try {
//     const user = await registerUser(req.body.email, req.body.username, req.body.password);
//     res.status(201).json({ status: "success", message: "User registered successfully", data: user });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(400).json({ message: error.message });
//     } else {
//       res.status(400).json({ message: 'An unknown error occurred' });
//     }
//   }
// };


// export const login = async (req: Request, res: Response) => {
//   try {
//     const user = await loginUser(req.body.email, req.body.password);
//     res.json({ user });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(400).json({ message: error.message });
//     } else {
//       res.status(400).json({ message: 'An unknown error occurred' });
//     }
//   }
// };
  




// // Google Authentication
// export const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

// export const googleAuthCallback = (req: Request, res: Response) => {
//   passport.authenticate("google", (err: any, user: { user: any; token: any; } | false, info: any) => {
//     if (err || !user) {
//       return res.status(401).json({ message: "Google authentication failed", error: err || info });
//     }

//     return res.json({
//       message: "Google authentication successful",
//       user: user.user,
//       token: user.token,
//     });
//   })(req, res);
// };

// // Apple Authentication
// export const appleAuth = passport.authenticate("apple", { scope: ["email", "name"] });

// export const appleAuthCallback = (req: Request, res: Response) => {
//   passport.authenticate("apple", (err: any, user: { user: any; token: any; } | false, info: any) => {
//     if (err || !user) {
//       return res.status(401).json({ message: "Apple authentication failed", error: err || info });
//     }

//     return res.json({
//       message: "Apple authentication successful",
//       user: user.user,
//       token: user.token,
//     });
//   })(req, res);
// };


import { Request, Response } from "express";
import { registerUser, loginUser, verifyEmail } from "./auth.service";
import passport from "passport";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body.email, req.body.username, req.body.password);
    res.status(201).json({ message: "User registered. Check your email to verify your account.", data: user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body.email, req.body.password);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const verifyEmailController = async (req: Request, res: Response) => {
  try {
    const result = await verifyEmail(req.query.token as string);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
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