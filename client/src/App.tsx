import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from "./pages/Main";
import Edit from "./pages/Edit";
import Event from "./pages/Event";
import Header from "./components/layouts/header";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3333";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Route exact path='/' component={Main} />
        <Route path='/edit' component={Edit} />
        <Route path='/event/:event' component={Event} />
      </Router>
    </React.Fragment>
  );
};

export default App;
