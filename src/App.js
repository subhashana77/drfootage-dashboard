import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// npm install react-router-dom@6
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import NotFount from "./page/Not-Fount";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="*" element={<NotFount/>}/>
          </Routes>
      </Router>

    // <div className="App main-background">
    //   <Login/>
    // </div>
  );
}

export default App;
