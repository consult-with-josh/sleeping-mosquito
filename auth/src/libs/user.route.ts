import { authenticateJWT } from "./auth.middleware";
import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/profile", authenticateJWT, (req: Request, res: Response) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

export default router;
