import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js"
const app = express();
const PORT =  process.env.PORT || 8080;
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://converseai-frontend.netlify.app",
  process.env.FRONTEND_URL,
].filter(Boolean);


app.use(cors({
  origin: (origin, cb) => {
    // allow Postman/curl (no origin)
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use("/api",chatRoutes)
app.listen(PORT, () => {
  console.log(`I am listening to the port ${PORT}`);
  connectDB()
});
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL).then(() => console.log('Connected to database!'));
  } catch (e) {
    console.log("Failed to connect the db",e);
  }
};
// app.post("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: req.body.message,
//         },
//       ],
//     }),
//   };
//   try {
//     const response = await fetch(
//       "https://api.openai.com/v1/chat/completions",
//       options
//     );
//     const data = await  response.json();
//    console.log(data.choices[0].message.content);
//     res.send(data);
//   } catch {
//     console.log("error");
//   }
//   return;
// });

// import OpenAI from 'openai';
// import 'dotenv/config';

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
// });

// const response = await client.responses.create({
//   model: 'gpt-4o-mini',
// //   instructions: 'You are a coding assistant that talks like a pirate',
//   input: 'Difference between sql and mongodb',
// });

// console.log(response.output_text);
