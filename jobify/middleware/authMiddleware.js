import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("authentication invalid");
  }

  try {
    const { userId, role } = verifyJWT(token);
    //create an object user and assign the object to it.
    req.user = { userId, role };
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
  next();
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.userId)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};
