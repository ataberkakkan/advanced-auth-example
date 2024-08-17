import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";

// IMPORT ROUTES
import authRoutes from "./routes/authRoutes.js";

//CONFIGS
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  connectDb();
  console.log(`Server is running on port ${port}`);
});
