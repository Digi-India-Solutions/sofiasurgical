const User = require("../Models/UserModel.js");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SignUp = async (req, res) => {
  try {
    const { email, fullName, phone, password } = req.body || {};
    if (!email || !fullName || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ email, fullName, phone, password });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sign-up server error" });
  }
};

const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const isUserExisted = await User.findOne({ email });
    if (!isUserExisted) {
      return res.status(400).json({ message: "User not found" });
    }
   
    if (isUserExisted.role !== "admin") {
      return res.status(400).json({ message: "User is not admin" });
    }

    const IsCorrectPassword = await bcrypt.compare(
      password,
      isUserExisted?.password
    );

    if (!IsCorrectPassword) {
      return res
        .status(400)
        .json({ message: "Authorized failed ! password is incorrect" });
    }

    const token = await isUserExisted.generateToken();

    return res.status(200).json({
      message: "Sign-in successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sign-in server error" });
  }
};
const SuperAdminSignIn = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const isUserExisted = await User.findOne({ email });
    if (!isUserExisted) {
      return res.status(400).json({ message: "User not found" });
    }
   
    if (isUserExisted.role !== "superAdmin") {
      return res.status(400).json({ message: "User is not super admin" });
    }

    const IsCorrectPassword = await bcrypt.compare(
      password,
      isUserExisted?.password
    );

    if (!IsCorrectPassword) {
      return res
        .status(400)
        .json({ message: "Authorized failed ! password is incorrect" });
    }

    const token = await isUserExisted.generateToken();

    return res.status(200).json({
      message: "Sign-in successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sign-in server error" });
  }
};

const sentResetPasswordMail = async (email, myToken, id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
  from: process.env.EMAILUSER,
  to: email,
  subject: "Reset Your Password - Sofia Surgical",
  html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Reset Password</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f9fc;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #0369a1;
        color: #ffffff;
        padding: 25px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 30px;
        color: #333333;
      }
      .content h2 {
        margin-top: 0;
        font-size: 20px;
      }
      .content p {
        line-height: 1.6;
        margin: 15px 0;
      }
      .button {
        display: inline-block;
        padding: 12px 30px;
        margin: 20px 0;
        background-color: #0369a1;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        transition: background-color 0.3s ease;
      }
      .button:hover {
        background-color: #03537c;
      }
      .footer {
        background-color: #e6f4fb;
        padding: 15px;
        text-align: center;
        font-size: 13px;
        color: #666666;
      }
      .note {
        color: #b91c1c;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Password Reset Request</h1>
      </div>
      <div class="content">
        <h2>Hello,</h2>
        <p>We received a request to reset your password for your Sofia Surgical account.</p>
        <p>Please click the button below to set a new password:</p>
        <a class="button" href="${process.env.ADMIN_URL}/reset-password/${id}/${myToken}">Reset Password</a>
        <p><strong>Or copy this link:</strong><br/>
        <a href="${process.env.ADMIN_URL}/reset-password/${id}/${myToken}">${process.env.ADMIN_URL}/reset-password/${id}/${myToken}</a></p>
        <p class="note">This link will expire soon for your security. Do not share this email or link with anyone.</p>
        <p>If you did not request this password reset, please ignore this email or contact our support team.</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Sofia Surgical. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `,
};


    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent: ", info.response);
      }
    });
  } catch (error) {
    console.error("Error while sending email: ", error);
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found " });
    }
   
    if (user.role !== "admin" && user.role !== "superAdmin") {
      return res.status(400).json({ message: "User is not admin or super admin" });
    }
    const token = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    user.resetPasswordToken = hashedToken;

    user.resetPasswordExpires = Date.now() + 1000 * 60 * 15;
    await user.save();

    await sentResetPasswordMail(email, token, user._id);
    return res
      .status(200)
      .json({ message: "Reset password link sent successfully" });
  } catch (error) {
    console.log("forgot password error", error);
    res.status(500).json({ message: "forgot password server error" });
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body || {};
    if (!id || !token || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      _id: id,
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(404)
        .json({ message: "User not found or Your reset link is expired" });

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.password = password;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log("reset password error", error);
    res.status(500).json({ message: "reset password server error" });
  }
};

const VerifyAdmin = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.role !== "admin")
      return res.status(400).json({ message: "User is not admin" });
    return res
      .status(200)
      .json({ message: "User verified successfully", success: true });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
};
const VerifySuperAdmin = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.role !== "superAdmin")
      return res.status(400).json({ message: "User is not super admin" });
    return res
      .status(200)
      .json({ message: "User verified successfully", success: true });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
};


module.exports = {
  SignUp,
  SignIn,
  ForgotPassword,
  ResetPassword,
  VerifyAdmin,
  VerifySuperAdmin,
  SuperAdminSignIn
};
