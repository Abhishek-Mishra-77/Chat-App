import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmpassword, gender } = req.body;

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Password did't match. " });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "username already exists! " });
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = {
      fullname: fullname,
      username: username,
      password: hashedPassword,
      gender: gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    };

    const result = await User.create(newUser);

    if (!result) {
      return res
        .status(400)
        .send({ message: "Something went wrong please try after some time. " });
    }

    generateTokenAndSetCookie(result._id, res);

    return res.status(200).send({ result });
  } catch (error) {
    console.log(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!user || !isPasswordCorrect) {
      return res
        .status(400)
        .send({ message: "Invalid username or password. " });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).send({
      _id: user.id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};
const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(400).send({ message: "Logged out successfully. " });
  } catch (error) {
    return res.status(400).send({ messga: error.message });
  }
};

export { signup, login, logout };
