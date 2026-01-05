import { Mongoose } from "mongoose";
const MessageSchema = new Mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content:{
    type:String,
    required:true
  },
  timestamp:{
    type:Date,
    default:Date.now
  }
});
