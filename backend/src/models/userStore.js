import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import User from "./User.js";

const memoryUsers = new Map();

const isMemoryStore = () => globalThis.USE_MEMORY_STORE === true;

const now = () => new Date();

const toSafeObject = (user) => ({
  id: String(user._id || user.id),
  name: user.name,
  email: user.email,
  role: user.role,
  avatarUrl: user.avatarUrl,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

const toAdminObject = (user) => ({
  _id: String(user._id || user.id),
  name: user.name,
  email: user.email,
  role: user.role,
  avatarUrl: user.avatarUrl,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

const ensureMemoryAdmin = async () => {
  if (!isMemoryStore() || !process.env.ADMIN_EMAIL || memoryUsers.has(process.env.ADMIN_EMAIL)) {
    return;
  }

  const createdAt = now();
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin@12345", 12);
  const name = process.env.ADMIN_NAME || "Admin User";
  memoryUsers.set(process.env.ADMIN_EMAIL.toLowerCase(), {
    id: crypto.randomUUID(),
    name,
    email: process.env.ADMIN_EMAIL.toLowerCase(),
    password,
    role: "admin",
    avatarUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`,
    refreshTokenHash: "",
    createdAt,
    updatedAt: createdAt
  });
};

export const findUserByEmail = async (email) => {
  if (isMemoryStore()) {
    await ensureMemoryAdmin();
    return memoryUsers.get(email.toLowerCase()) || null;
  }

  return User.findOne({ email: email.toLowerCase() }).select("+password +refreshTokenHash");
};

export const findUserById = async (id) => {
  if (isMemoryStore()) {
    await ensureMemoryAdmin();
    return Array.from(memoryUsers.values()).find((user) => user.id === id) || null;
  }

  return User.findById(id).select("+refreshTokenHash");
};

export const createUser = async ({ name, email, password, role = "user", avatarUrl }) => {
  if (isMemoryStore()) {
    await ensureMemoryAdmin();
    const createdAt = now();
    const user = {
      id: crypto.randomUUID(),
      name,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 12),
      role,
      avatarUrl,
      refreshTokenHash: "",
      createdAt,
      updatedAt: createdAt
    };
    memoryUsers.set(user.email, user);
    return user;
  }

  return User.create({ name, email, password, role, avatarUrl });
};

export const compareUserPassword = (user, password) => bcrypt.compare(password, user.password);

export const saveRefreshTokenHash = async (user, refreshTokenHash) => {
  if (isMemoryStore()) {
    user.refreshTokenHash = refreshTokenHash;
    user.updatedAt = now();
    memoryUsers.set(user.email, user);
    return user;
  }

  user.refreshTokenHash = refreshTokenHash;
  await user.save({ validateBeforeSave: false });
  return user;
};

export const clearRefreshTokenHash = async (id) => {
  if (isMemoryStore()) {
    const user = await findUserById(id);
    if (user) {
      user.refreshTokenHash = "";
      user.updatedAt = now();
      memoryUsers.set(user.email, user);
    }
    return;
  }

  await User.findByIdAndUpdate(id, { $unset: { refreshTokenHash: 1 } });
};

export const listUsers = async () => {
  if (isMemoryStore()) {
    await ensureMemoryAdmin();
    return Array.from(memoryUsers.values())
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(toAdminObject);
  }

  const users = await User.find({})
    .select("name email role avatarUrl createdAt updatedAt")
    .sort({ createdAt: -1 });
  return users.map(toAdminObject);
};

export const userToSafeObject = toSafeObject;
