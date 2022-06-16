import { Router, Request } from "express";
import auth from "../../middlewares/authMiddleware";
import dtoValidationMiddleware from "../../middlewares/dtoValidationMiddleware";
import Message from "../../models/Message";
import { SendMessageDto } from "./DTO/sendMessageDto";

const router = Router();

interface currentUserInfoRequest extends Request {
  currentUser: { id: string; email: string };
}

router.get("/getMessages", auth, async (req: currentUserInfoRequest, res) => {
  const messages = await Message.find({ receiver: req.currentUser.email });
  return res.send(messages);
});

router.post(
  "/sendMessage",
  auth,
  dtoValidationMiddleware(SendMessageDto),
  async (req: currentUserInfoRequest, res) => {
    const { message, receiver, subject }: SendMessageDto = req.body;

    const newMessage = new Message({
      sender: req.currentUser.email,
      message,
      receiver,
      subject,
      read: false,
    });

    await newMessage.save();

    return res.status(201).json({
      msg: "message sent successfully",
    });
  }
);

router.put(
  "/readMessage/:msgId",
  auth,
  async (req: currentUserInfoRequest, res) => {
    try {
      const message = await Message.findById(req.params.msgId);

      if (!message || req.currentUser.email !== message.receiver) {
        return res.status(404).send("no message was found");
      }

      if (!message.read) {
        message.read = true;
        await message.save();
      }

      return res.send(message);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send(err);
    }
  }
);

export default router;
