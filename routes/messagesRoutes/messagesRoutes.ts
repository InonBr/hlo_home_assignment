import { Router, Request } from "express";
import auth from "../../middlewares/authMiddleware";
import dtoValidationMiddleware from "../../middlewares/dtoValidationMiddleware";
import Message from "../../models/Message";
import { SendMessageDto } from "./DTO/sendMessageDto";

const router = Router();

interface currentUserInfoRequest extends Request {
  currentUser: { id: string; email: string };
}

router.get("/getMessages", auth, (req: currentUserInfoRequest, res) => {
  console.log(req.currentUser);
  res.send("hello world");
});

router.post(
  "/sendMessage",
  auth,
  dtoValidationMiddleware(SendMessageDto),
  (req: currentUserInfoRequest, res) => {
    const { message, receiver, subject }: SendMessageDto = req.body;

    const newMessage = new Message({
      sender: req.currentUser.email,
      message,
      receiver,
      subject,
      read: false,
    });

    newMessage.save();

    return res.status(201).json({
      msg: "message sent successfully",
    });
  }
);

export default router;
