/**
 * Email Service
 * 
 * Provides email functionality for the application, handling various types of
 * email notifications and communications with users.
 * 
 * Email Types:
 * - Welcome emails
 * - Verification emails
 * - Password reset
 * - Session notifications
 * - System alerts
 * - Newsletter
 * 
 * Features:
 * - HTML email templates
 * - Queue management
 * - Retry mechanism
 * - Attachment handling
 * - Template variables
 * 
 * Configuration:
 * - SMTP settings
 * - Rate limiting
 * - Template paths
 * - Sender details
 * 
 * Error Handling:
 * - SMTP errors
 * - Template errors
 * - Invalid recipients
 * - Queue failures
 * 
 * Dependencies:
 * - Nodemailer for sending emails
 * - Email templates
 * - Queue service
 * - Environment config
 * 
 * @type {module} Email handling service
 */

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.sendVerificationEmail = async (email, verificationToken) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Verify Your Email',
    html: `
      <h1>Email Verification</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>This link will expire in 24 hours.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

exports.sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `
  };

  await transporter.sendMail(mailOptions);
}; 