import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const cookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge
});

const accessCookieName = "accessToken";
const refreshCookieName = "refreshToken";

const validatePasswordStrength = (password) => {
  const checks = [
    { valid: password.length >= 8, message: "at least 8 characters" },
    { valid: /[A-Z]/.test(password), message: "one uppercase letter" },
    { valid: /[a-z]/.test(password), message: "one lowercase letter" },
    { valid: /\d/.test(password), message: "one number" },
    { valid: /[^A-Za-z0-9]/.test(password), message: "one special character" }
  ];

  const missing = checks.filter((check) => !check.valid).map((check) => check.message);
  return missing.length ? `Password must include ${missing.join(", ")}.` : "";
};

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const signAccessToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m"
  });

const signRefreshToken = (userId) =>
  jwt.sign(
    { userId, tokenId: crypto.randomUUID() },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" }
  );

const sendTokens = async (res, user, rememberMe = false) => {
  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  const refreshTokenHash = await bcrypt.hash(refreshToken, 12);

  user.refreshTokenHash = refreshTokenHash;
  await user.save({ validateBeforeSave: false });

  const accessMaxAge = 15 * 60 * 1000;
  const refreshMaxAge = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

  res.cookie(accessCookieName, accessToken, cookieOptions(accessMaxAge));
  res.cookie(refreshCookieName, refreshToken, cookieOptions(refreshMaxAge));

  return { accessToken };
};

const clearAuthCookies = (res) => {
  res.clearCookie(accessCookieName, cookieOptions(0));
  res.clearCookie(refreshCookieName, cookieOptions(0));
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, rememberMe } = req.body;

    if (!name?.trim() || !email?.trim() || !password || !confirmPassword) {
      res.status(400);
      throw new Error("Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      res.status(400);
      throw new Error("Passwords do not match.");
    }

    const passwordIssue = validatePasswordStrength(password);
    if (passwordIssue) {
      res.status(400);
      throw new Error(passwordIssue);
    }

    const normalizedEmail = normalizeEmail(email);
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      res.status(409);
      throw new Error("An account with this email already exists.");
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      avatarUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name.trim())}`
    });

    await sendTokens(res, user, Boolean(rememberMe));

    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: user.toSafeObject()
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email?.trim() || !password) {
      res.status(400);
      throw new Error("Email and password are required.");
    }

    const user = await User.findOne({ email: normalizeEmail(email) }).select("+password +refreshTokenHash");
    if (!user || !(await user.comparePassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password.");
    }

    await sendTokens(res, user, Boolean(rememberMe));

    res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      user: user.toSafeObject()
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user.toSafeObject()
  });
};

export const refreshSession = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      res.status(401);
      throw new Error("No refresh token found.");
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId).select("+refreshTokenHash");

    if (!user?.refreshTokenHash || !(await bcrypt.compare(token, user.refreshTokenHash))) {
      res.status(401);
      throw new Error("Refresh token is invalid.");
    }

    await sendTokens(res, user, true);

    res.status(200).json({
      success: true,
      message: "Session refreshed.",
      user: user.toSafeObject()
    });
  } catch (error) {
    clearAuthCookies(res);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        await User.findByIdAndUpdate(decoded.userId, { $unset: { refreshTokenHash: 1 } });
      } catch {
        clearAuthCookies(res);
      }
    }

    clearAuthCookies(res);
    res.status(200).json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    next(error);
  }
};
