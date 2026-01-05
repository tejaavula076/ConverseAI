import express from "express";
import "dotenv/config";
import cors from "cors";
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cors());
app.listen(PORT, () => {
  console.log(`I am listening to the port ${PORT}`);
});
app.post("/test", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: req.body.message,
        },
      ],
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await  response.json();
   console.log(data.choices[0].message.content);
    res.send(data);
  } catch {
    console.log("error");
  }
  return;
});

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
