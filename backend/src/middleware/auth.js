import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  const cookieName = process.env.COOKIE_NAME || "token";
  let token = req.cookies?.[cookieName];
  if (!token && req.headers.authorization?.startWith("Bearer")) {
    token = req.headers.authorization.split("")[1];
  }
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
  } catch {
    error;
  }
  {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
export const requireRole =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
