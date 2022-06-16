import { Router, Request } from "express";
import auth from "../../middlewares/authMiddleware";

const router = Router();

interface currentUserInfoRequest extends Request {
  currentUser: { id: string; email: string };
}

router.get("/getMessages", auth, (req: currentUserInfoRequest, res) => {
  console.log(req.currentUser);
  res.send("hello world");
});

export default router;
