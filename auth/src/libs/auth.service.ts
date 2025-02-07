// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import User from "../libs/model/user.model";

// export const registerUser = async (email: string, username: string, password: string) => {
//   try {
//     // Check if username is provided
//     if (!username) {
//       throw new Error("Username is required");
//     }

//     // Check for existing username
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       throw new Error("Username is already taken");
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ email, username, password: hashedPassword });
//     return user;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(`Registration failed: ${error.message}`);
//     } else {
//       throw new Error("Registration failed: An unknown error occurred");
//     }
//   }
// };



// export const loginUser = async (email: string, password: string) => {
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !user.password || !await bcrypt.compare(password, user.password)) {
//       throw new Error("Invalid credentials");
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

//     return {
//       status: "success",
//       data: user,
//       message: "Login successful",
//       token: token
//     };
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(`Login failed: ${error.message}`);
//     } else {
//       throw new Error("Login failed: An unknown error occurred");
//     }
//   }
// };

// export const validateGoogleUser = async (profile: any) => {
//   try {
//     let user = await User.findOne({ googleId: profile.id });

//     if (!user) {
//       user = await User.create({
//         googleId: profile.id,
//         email: profile.emails?.[0]?.value,
//         username: profile.displayName, // Use Google display name
//       });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

//     return {
//       status: "success",
//       data: user,
//       message: "Google authentication successful",
//       token: token
//     };
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(`Google authentication failed: ${error.message}`);
//     } else {
//       throw new Error("Google authentication failed: An unknown error occurred");
//     }
//   }
// };


import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../libs/model/user.model";
import { validateRegisterInput, validateLoginInput } from "./helpers/validate-input.helper";
// import { sendVerificationEmail } from "./helpers/send-email.helper";
import { generateToken } from "./helpers/generate-token.helper";

export const registerUser = async (email: string, username: string, password: string) => {
  validateRegisterInput(email, username, password);

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) throw new Error("Email or username already taken.");

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
    console.log("Verification token:", token)

    if (!user) throw new Error("Invalid token.");

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return { message: "Email verified successfully." };
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
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
  
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
  
