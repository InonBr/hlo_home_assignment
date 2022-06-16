require("dotenv").config();
import { Router } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import User from "../../models/User";
import dtoValidationMiddleware from "../../middlewares/dtoValidationMiddleware";
import { SingUpDto } from "./DTO/singUpDto";
import { LogInDto } from "./DTO/logInDto";

const router = Router();

router.post(
  "/register",
  dtoValidationMiddleware(SingUpDto),
  async (req, res) => {
    try {
      const { password, email }: SingUpDto = req.body;

      const bcryptPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        password: bcryptPassword,
      });

      await newUser.save();

      const token = jwt.sign(
        {
          id: newUser._id,
          email: newUser.email,
        },
        process.env.TOKEN
      );

      return res.status(200).json({
        msg: "user saved successfully",
        token,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ err: "Server error", message: err.message });
    }
  }
);

router.post("/login", dtoValidationMiddleware(LogInDto), async (req, res) => {
  try {
    const { email, password }: LogInDto = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "invalid credentials" });
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      return res.status(400).json({ msg: "invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.TOKEN
    );

    return res.status(200).json({
      msg: "user logged in successfully",
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ err: "Server error", message: err.message });
  }
});

export default router;
