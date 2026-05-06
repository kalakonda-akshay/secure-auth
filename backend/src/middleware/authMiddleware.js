import jwt from "jsonwebtoken";
import { findUserById } from "../models/userStore.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      res.status(401);
      throw new Error("Not authorized. Please log in.");
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await findUserById(decoded.userId);

    if (!user) {
      res.status(401);
      throw new Error("User no longer exists.");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401);
      error.message = "Session expired. Please refresh or log in again.";
    }
    next(error);
  }
};
