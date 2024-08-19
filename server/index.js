import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import connectDb from "./config/db.js";

// IMPORT ROUTES
import authRoutes from "./routes/authRoutes.js";

const __dirname = path.resolve();

//CONFIGS
dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  connectDb();
  console.log(`Server is running on port ${port}`);
});
