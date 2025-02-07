// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendVerificationEmail = async (email: string, token: string) => {
//   const verificationLink = `${process.env.BASE_URL}/auth/verify-email?token=${token}`;

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Verify Your Email",
//     html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
//   });
// };
