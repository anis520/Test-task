import express from "express";
import colors from "colors";
import { handleError } from "./utils/handleError.js";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";

import mongoDBConnect from "./config/database.js";
import cors from "cors";

dotenv.config();

const app = express();

// socket connection

//

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "https://test-task-beryl.vercel.app",

    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// environment vars
const PORT = process.env.PORT || 5050;

// set static

app.use(express.static("public"));

app.use("/api/v1", userRoute);

app.use(handleError);
app.listen(PORT, () => {
  console.log(`server was running on port ${PORT}`.bgBlue);
  mongoDBConnect();
});
