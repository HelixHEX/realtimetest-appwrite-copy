import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Chat from "./Components/Chat";
import Login from "./Components/Login";

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" render={(props) => <Login {...props} />} />
        <Route exact path="/Chat" render={(props) => <Chat {...props} />} />
      </div>
    </Router>
  );
};

export default App;
