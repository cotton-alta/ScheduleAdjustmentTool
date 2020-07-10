import 
  React,
  { 
    useEffect,
    useReducer,
    useContext
  } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import { EventContext } from "../App";
import { DateList } from "../components/ui/DateList";
import { CheckList } from "../components/ui/CheckList";
import { userAction } from "../actions/user";
import { withRouter } from "react-router";
import history from "../history";

import "../assets/style/join.scss";

type User = {
  name:       string,
  possible:   Array<string>,
  subtle:     Array<string>,
  impossible: Array<string>
}

const initUser: User = {
  name: "",
  possible: [],
  subtle: [],
  impossible: []
}

const UserContext = React.createContext<any>(null);

const JoinComponent: React.FC = () => {
  const { stateEdit, dispatch } = useContext(EventContext);
  const { event } = useParams();
  const [ stateUser, userDispatch ] = useReducer(userAction, initUser);
  const value = { stateUser, userDispatch };
  useEffect(() => {
    const start = Moment(stateEdit.startDate);
    const end = Moment(stateEdit.endDate);
    initUser.possible = [];
    initUser.subtle = [];
    initUser.impossible = [];
    while(start.format() != end.format()) {
      initUser.impossible.push(start.format("YYYY-MM-DD"));
      start.add('days', 1);
    }
    initUser.impossible.push(start.format("YYYY-MM-DD"));
    console.log(initUser.impossible);
    userDispatch({
      type: "dateInit",
      payload: {
        name: "",
        impossible : initUser.impossible,
        subtle: [],
        possible: []
      }
    });
  }, []);

  const postData = () => {
    dispatch({
      type: "setUser",
      payload: {
        stateUser
      }
    });
    axios.post(`/api/v1/events/${event}`, stateEdit.user)
      .then((result: any) => {
        history.push(`/event/${result.data._id}`);
      });
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    userDispatch({
      type: "dataChange",
      payload: {
        name: e.target.value
      }
    });
  };

  return (
    <UserContext.Provider value={value}>
      <div className="join-wrapper">
        <input type="text" onChange={changeName} />
        <table className="table-wrapper">
          <tbody>
            <tr className="table-tr">
              <DateList data={ stateEdit } />
            </tr>
            <tr className="table-tr">
              <CheckList data={ stateEdit } />
            </tr>
          </tbody>
        </table>
        <div
          className="join-button"
          onClick={postData}
          >
          送信
        </div>
        {/* /.join-button */}
      </div>
      {/* /.join-wrapper */}
    </UserContext.Provider>
  );
};

const Join = withRouter(JoinComponent);

export {
  Join,
  UserContext
};