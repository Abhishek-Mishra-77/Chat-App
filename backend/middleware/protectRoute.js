import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(101)
        .send({ message: "Unauthorized - No Token Provided. " });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

    if (!decoded) {
      return res
        .status(101)
        .send({ message: "Unauthorized -  Invalid Token. " });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(101).send({ message: "User not found " });
    }

    req.user = user;

    next()

  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export default protectRoute;
