import "./App.css";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
// eslint-disable-next-line no-unused-vars
import { myContext } from "./MyContext.jsx";
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import "./app.css";
function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setcurrThreadId] = useState(uuidv1);
  const [prevChats, setprevChats] = useState([]); //stores prev chats of curr threads
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setcurrThreadId,
    newChat,
    setNewChat,
    prevChats,
    setprevChats,
    allThreads,
    setAllThreads,
  };

  return (
    <div className="app">
      <myContext.Provider value={providerValues}>
        <Sidebar />
        <ChatWindow />
      </myContext.Provider>
    </div>
  );
}

export default App;
