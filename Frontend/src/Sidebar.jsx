import React from "react";
import "./Sidebar.css";
function Sidebar() {
  return (
    <div>
      {/* {new chat window} */}
      <section className="sidebar">
        <button>
          <img
            src="../public/converse-ai-icon.png"
            alt="gptlogo"
            className="logo"
          ></img>
          <span>
            {" "}
            <i class="fa-solid fa-pen-to-square"></i>
          </span>
        </button>

        {/* {history}*/}
        <ul className="history">
          <li>history1</li>
          <li>history2</li>
          <li>history3</li>
          <li>history4</li>
          <li>history5</li>
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
