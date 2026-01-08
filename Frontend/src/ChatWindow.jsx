import React, { useContext, useState, useEffect } from "react";
import "./ChatWindow.css";
import Chat from "./Chat";
import { myContext } from "./MyContext.jsx";
import { PropagateLoader } from "react-spinners";

function ChatWindow() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false); //set default false value
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    // setcurrThreadId,
    // prevChats,
    setprevChats,
    setNewChat,
  } = useContext(myContext);
  const getReply = async () => {
    setLoading(true);
    setNewChat(false);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt, threadId: currThreadId }),
    };
    try {
      const response = await fetch("https://converseai-backend.onrender.com/api/chat", options);
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
      setprevChats((prevChats) => [
        ...prevChats,
        { role: "user", content: prompt },
        { role: "assistant", content: reply },
      ]);
    }
    setPrompt("");
  }, [reply]);
  let toggleDropdown = () => {
    console.log(isOpen)
    if (isOpen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          ConverseGPT &nbsp;
          <i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="userIcon">
          <span>
            <i className="fa-solid fa-user" onClick={ toggleDropdown}></i>
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">
            Upgrade Plan<i class="fa-solid fa-up-right-from-square"></i>
          </div>
          <div className="dropDownItem">
            Settings<i class="fa-solid fa-gear"></i>
          </div>
          <div className="dropDownItem">
            Log Out<i class="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
        </div>
      )}
     
      <Chat></Chat>
       {loading && <PropagateLoader color="white" className="loader" />}

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
