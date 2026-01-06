/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./Sidebar.css";
import { myContext } from "./MyContext";
import { useContext } from "react";
import { v1 as uuidv1 } from "uuid";
function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setcurrThreadId,
    newChat,
    setNewChat,
    setPrompt,
    setReply,
    setprevChats,
  } = useContext(myContext);
  const getAllThreaads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();
    //   console.log(res);
      //threadid,title -> filtered data
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
    //   console.log(filteredData);
      setAllThreads(filteredData);
    } catch (e) {
      console.log(e);
    }
  };
  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setcurrThreadId(uuidv1());
    setprevChats([]);
    getAllThreaads();
  };
  useEffect(() => {
    getAllThreaads();
  }, []);
  let changeThread = async (newThreadId) => {
    setcurrThreadId(newThreadId);
    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${newThreadId}`
      );
      const res = await response.json();
      console.log(res);
      setprevChats(res)
      setNewChat(false)
      setReply(null)
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {/* {new chat window} */}
      <section className="sidebar">
        <button onClick={createNewChat}>
          <img src="/converse-ai-icon.png" alt="gptlogo" className="logo"></img>
          <span>
            {" "}
            <i className="fa-solid fa-pen-to-square"></i>
          </span>
        </button>

        {/* {history}*/}
        <ul className="history">
          {allThreads.map((el, idx) => (
            <li key={idx} onClick={() => changeThread(el.threadId)}>
              {el.title}
            </li>
          ))}
        </ul>
        {/* {sign} */}
        <div className="sign">
          <p>By Tejaswi Avula &hearts;</p>
        </div>
      </section>
    </div>
  );
}

export default Sidebar;
