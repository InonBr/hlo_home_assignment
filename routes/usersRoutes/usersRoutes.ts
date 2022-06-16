require("dotenv").config();
import { Router } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import User from "../../models/User";
import dtoValidationMiddleware from "../../middlewares/dtoValidationMiddleware";
import { singUpDto } from "./DTO/singUpDto";

const router = Router();

router.post(
  "/register",
  dtoValidationMiddleware(singUpDto),
  async (req, res) => {
    try {
      const { password, email }: singUpDto = req.body;

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

export default router;
