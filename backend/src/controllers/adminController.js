import User from "../models/User.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
      .select("name email role avatarUrl createdAt updatedAt")
      .sort({ createdAt: -1 });

    const analytics = {
      totalUsers: users.length,
      admins: users.filter((user) => user.role === "admin").length,
      standardUsers: users.filter((user) => user.role === "user").length,
      latestSignup: users[0]?.createdAt || null
    };

    res.status(200).json({
      success: true,
      analytics,
      users
    });
  } catch (error) {
    next(error);
  }
};
