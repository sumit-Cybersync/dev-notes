import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

if (!JWT_SECRET) {
  throw new Error("Please provide JWT_SECRET in the environment variables");
}

if (!JWT_EXPIRES_IN) {
  throw new Error("Please provide JWT_EXPIRES_IN in the environment variables");
}

export const generateToken = (user: any) => {
  return jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
