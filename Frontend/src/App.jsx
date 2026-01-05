import "./App.css";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
// eslint-disable-next-line no-unused-vars
import { myContext } from "./MyContext.jsx";
import "./app.css"
function App() {
  const providerValues = {};

  return (
    <div className="app">
      <myContext.Provider values={providerValues}> 
        <Sidebar />
        <ChatWindow />
      </myContext.Provider>
    </div>
  );
}

export default App;
