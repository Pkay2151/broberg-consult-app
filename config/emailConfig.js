// const nodemailer = require("nodemailer");

// // Create transporter for sending emails
// const createTransporter = () => {
//   return nodemailer.createTransport({
//     service: "gmail", // You can change this to your preferred email service
//     auth: {
//       user: process.env.EMAIL_USER, // Your email
//       pass: process.env.EMAIL_PASS, // Your email password or app password
//     },
//   });
// };

// // Send forgot password email
// const sendForgotPasswordEmail = async (email, resetToken) => {
//   const transporter = createTransporter();

//   const resetUrl = `${process.env.FRONTEND_URL}api//auth/reset-password?token=${resetToken}`;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Password Reset Request - Broberg Consult",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <h2 style="color: #333;">Password Reset Request</h2>
//         <p>You have requested to reset your password for your Broberg Consult account.</p>
//         <p>Click the button below to reset your password:</p>
//         <div style="text-align: center; margin: 30px 0;">
//           <a href="${resetUrl}" 
//              style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
//             Reset Password
//           </a>
//         </div>
//         <p>Or copy and paste this link in your browser:</p>
//         <p style="word-break: break-all; color: #007bff;">${resetUrl}</p>
//         <p><strong>This link will expire in 1 hour.</strong></p>
//         <p>If you did not request this password reset, please ignore this email.</p>
//         <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
//         <p style="color: #666; font-size: 12px;">
//           Best regards,<br>
//           Broberg Consult Team
//         </p>
        
//       </div>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     // console.log("Password reset email sent successfully");
//     return {
//       success: true,
//       message: "Password reset email sent successfully",
//     };
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return { success: false, message: "Failed to send password reset email" };
//   }
// };

// module.exports = {
//   sendForgotPasswordEmail,
// };
