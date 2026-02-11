import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export const getUserFromToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return null;
  }

  try {
    const decodedToken = verifyToken(token.value);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
