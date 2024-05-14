import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./db/db.mjs";
import { errorMiddleware } from "./middlewares/error.middleware.mjs";
import { userRoutes } from "./routes/user.routes.mjs";
import cookieParser from "cookie-parser";
import path from 'path';
dotenv.config();
import cors from "cors";
import { folderRoutes } from "./routes/folder.routes.mjs";

const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api/v1",userRoutes)
app.use("/api/v1",folderRoutes)

//-----------------------Deployment------------------------
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, ".././frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, ".././frontend", "dist", "index.html"));
});

// <-------------------- ------------------------>

app.use(errorMiddleware);
connectToDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
