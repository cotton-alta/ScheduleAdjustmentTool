import React, { useReducer } from "react";
import { Router, Route } from "react-router-dom";
// import { EditContextProvider } from "./pages/Edit";
import { eventAction } from "./actions/event";

import Main from "./pages/Main";
import Edit from "./pages/Edit";
import Event from "./pages/Event";
import Header from "./components/layouts/header";
import { Join } from "./pages/Join";
import CreateResult from "./pages/CreateResult";
import history from "./history";

import "./assets/style/reset.scss";
import "./assets/style/variables.scss";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3333";

const EventContext = React.createContext<any>(null);
const initEvent = {
  title: "sample",
  password: "password",
  description: "説明",
  startDate: "2020/05/31",
  endDate: "2020/05/31"
};

const App: React.FC = () => {
  const [ stateEdit, dispatch ] = useReducer(eventAction, initEvent);
  const value = { stateEdit, dispatch };
  return (
    <React.Fragment>
      <EventContext.Provider value={value}>
      <Router history={history}>
        <Header />
        <Route exact path='/' component={Main} />
        <Route path='/edit' component={Edit} />
        <Route path='/event/:event' component={Event} />
        <Route path='/join/:event' component={Join} />
        <Route path='/check/:event' component={CreateResult} />
      </Router>
      </EventContext.Provider>
    </React.Fragment>
  );
};

export {
  App,
  EventContext
};
