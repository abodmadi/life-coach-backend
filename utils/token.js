import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const userToken = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET
    //{ expiresIn: "1h" }
  );
  return userToken;
};

