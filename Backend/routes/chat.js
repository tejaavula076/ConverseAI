import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";
const router = express.Router();

//test
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "abc",
      title: "testing new thread",
    });
    const response = await thread.save();
    res.send(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to save in db" });
  }
});
//Get all threads
router.get("/thread", async (req, res) => {
  try {
    //desc order based on updatedAT
    const Threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(Threads);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});
//get the particular thread
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    let particularId = await Thread.findOne({ threadId });
    if (!particularId) {
      res.status(400).json({ error: "Thread not found" });
    }
    res.json(particularId.messages);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "Failed to fetch that particular thread Id" });
  }
});
//delete the particular thread
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deleteThread = await Thread.findOneAndDelete({ threadId });
    if (!deleteThread) {
      res.status(400).json({ error: "Thread not found" });
    }
    res.status(200).json({ success: "Thread deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to delete" });
  }
});
//get the thread info
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;
  if (!threadId || !message) {
    res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      //create a new thread
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }
    const assistantReply = await getOpenAIAPIResponse(message);
    console.log("assistant replied",assistantReply)
    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();
    await thread.save();
    res.json({ reply: assistantReply });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something is wrong" });
  }
});

export default router;
