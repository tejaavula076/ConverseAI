import React, { useContext, useState, useEffect } from "react";
import "./ChatWindow.css";
import Chat from "./Chat";
import { myContext } from "./MyContext.jsx";
import { PropagateLoader } from "react-spinners";

function ChatWindow() {
  const [loading, setLoading] = useState(false);
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setcurrThreadId,
    prevChats,
    setprevChats,
  } = useContext(myContext);
  const getReply = async () => {
    setLoading(true);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt, threadId: currThreadId }),
    };
    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      const res = await response.json();
      setReply(res.reply);
      console.log(res);
      console.log(reply);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  //append new chat to prev chat
  useEffect(() => {
    if (prompt && reply) {
      setprevChats(
        (prevChats) => (
          [...prevChats],
          { role: "user", content: prompt },
          { role: "assistant", content: reply }
        )
      );
    }
    setPrompt("")
  }, [reply]);
  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          ConverseGPT &nbsp;
          <i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="userIcon">
          <span>
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      <Chat></Chat>
      {loading && <PropagateLoader color="white" />}

      <div className="chatInput">
        <div className="inputBox">
          <input
            type="text"
            placeholder="Ask Anything"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
          ></input>
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">
          CoverseGPT can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
