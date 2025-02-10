import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../libs/model/user.model";
import { validateRegisterInput, validateLoginInput } from "./helpers/validate-input.helper";
// import { sendVerificationEmail } from "./helpers/send-email.helper";
import { generateToken } from "./helpers/generate-token.helper";

export const registerUser = async (email: string, username: string, password: string) => {
  validateRegisterInput(email, username, password);

 
  const existingEmail = await User.findOne({ email });
  if (existingEmail) throw new Error("Email is already taken.");

  const existingUsername = await User.findOne({ username });
  if (existingUsername) throw new Error("Username is already taken.");
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "24h" });

  const user = await User.create({ email, username, password: hashedPassword, verificationToken });

  // await sendVerificationEmail(email, verificationToken);

  return user;
};

export const loginUser = async (email: string, password: string) => {
  validateLoginInput(email, password);

  const user = await User.findOne({ email });
  if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials.");
  }

  if (!user.isVerified) throw new Error("Please verify your email before logging in.");

  return { token: generateToken(user), user };
};

export const verifyEmail = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    const user = await User.findOne({ email: decoded.email });

    if (!user) throw new Error("Invalid token.");

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return {
      status: "success",
      message: "Email successfully verified.",
      data: user,
    };

  } catch (error) {
    throw new Error("Invalid or expired token.");
  }
};

export const validateGoogleUser = async (profile: any) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
  
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          email: profile.emails?.[0]?.value,
          username: profile.displayName, // Use Google display name
        });
      }
  
      // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
      const token = generateToken(user);

  
      return {
        status: "success",
        data: user,
        message: "Google authentication successful",
        token: token
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Google authentication failed: ${error.message}`);
      } else {
        throw new Error("Google authentication failed: An unknown error occurred");
      }
    }
  };
  
