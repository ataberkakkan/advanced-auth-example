import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ message: "Server error" });
  }
};

export default verifyToken;
