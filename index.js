import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import { connectDB } from "./config/DBconnect.js";
import { fileURLToPath } from 'url';
import { generateAIContent } from './api.js';
const app = express();
const PORT = 8000;

// To get the current directory in ES module format
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (e.g., HTML, JS, CSS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'views/public')));
connectDB("mongodb://127.0.0.1:27017/fina");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", userRoute);
app.post('/generate-content', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const aiContent = await generateAIContent(prompt);
    res.json({ text: aiContent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate AI content' });
  }
});
app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
