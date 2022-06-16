import * as express from "express";
import * as cors from "cors";
import connectDB from "./db/db";
import usersRouters from "./routes/usersRoutes/usersRoutes";
import messagesRoutes from "./routes/messagesRoutes/messagesRoutes";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", usersRouters);
app.use("/api", messagesRoutes);

connectDB().then(() => {
  console.log("🔵 MongoDB connected...");
  app.listen(port, () => {
    console.log(`🟢 App listening at http://localhost:${port}`);
  });
});
