import jwt from "jsonwebtoken";
import prismaClient from "../utils/prismaClient.js";

export const authenticateToken = async (request, response, next) => {
  try {
    const token = request.cookies.access_token;
    if (!token)
      return response.status(401).json({
        error: "Access denied, no token provided",
      });
    const accessToken = jwt.verify(token, process.env.JWT_SECRET);
    const authUser = await prismaClient.user.findUnique({
      where: {
        id: accessToken.userId,
      },
    });
    if (!authUser)
      return response.status(400).json({
        error: "User not authorized!",
      });
    request.user = authUser;
    next();
  } catch (error) {
    return response.status(400).json({
      error: "Invalid token",
    });
  }
};

export const authenticateRole = (allowedRoles) => {
  return (request, response, next) => {
    try {
      const user = request.user;
      if (!user) {
        return response
          .status(401)
          .json({ message: "Unauthorized: User not authenticated" });
      }

      if (!allowedRoles.includes(user.role)) {
        return response
          .status(403)
          .json({ message: "Forbidden: Insufficient permissions" });
      }
      next();
    } catch (error) {
      return response.status(400).json({
        error: "Unauthorized!",
      });
    }
  };
};
