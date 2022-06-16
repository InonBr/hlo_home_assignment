import * as express from "express";
import * as cors from "cors";
import connectDB from "./db/db";
import { singUpDto } from "./routes/usersRoutes/DTO/singUPDto";
import dtoValidationMiddleware from "./middlewares/dtoValidationMiddleware";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post("/", dtoValidationMiddleware(singUpDto), (req, res) => {
  const { password, passwordConfirm, username }: singUpDto = req.body;
  res.send({ password, passwordConfirm, username });
});

connectDB().then(() => {
  console.log("🔵 MongoDB connected...");
  app.listen(port, () => {
    console.log(`🟢 App listening at http://localhost:${port}`);
  });
});
