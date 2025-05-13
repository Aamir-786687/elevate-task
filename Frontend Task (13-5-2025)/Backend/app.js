import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import notesRouter from "./routes/notesRouter.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", authRouter);
app.use("/", notesRouter);

const port = process.env.PORT ;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
