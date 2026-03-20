import { User } from "../models/User.js";
import { ROLES } from "../utils/constants.js";

export const getUsers = async (req, res) => {
  const filter = {};
  if (req.query.role && Object.values(ROLES).includes(req.query.role)) {
    filter.role = req.query.role;
  }

  const users = await User.find(filter).select("-password").sort({ createdAt: -1 });
  return res.json({ users });
};
