import React, { 
  useState, 
  useContext,
  useEffect
} from "react";
import { useParams } from "react-router-dom";
import { DateList } from "../components/ui/DateList";
import { EventContext } from "../App";
import { ListRender } from "../components/ui/ListRender";
import { DecisionList } from "../components/ui/DecisionList";
import axios from "axios";
import history from "../history";

interface AuthResponse {
  auth: boolean
}

const DateDecision: React.FC = () => {
  const [ authenticated, setAuthenticated ] = useState(false);
  const [ hostAuthenticated, setHostAuthenticated ] = useState(false);
  const [ hostPassword, setHostPassword ] = useState("");
  const { stateEdit, dispatch } = useContext(EventContext);
  const { event } = useParams<any>();

  const postDate = () => {
    axios.post(
      `/api/v1/events/${event}/decision`, 
      { "date": stateEdit.decisionDate.date }
    )
    .then(result => {
      history.push(`/event/${event}`);
    });
  };

  useEffect(() => {
    axios.get(`/api/v1/events/${event}`)
    .then(res => {
      const data = res.data;
      dispatch({
        type: "checkEvent",
        payload: {
          title:       data.title,
          description: data.description,
          startDate:   data.startDate,
          endDate:     data.endDate,
          password:    data.password,
          user:        data.user,
          decisionDate: {
            judge: data.decisionDate.judge,
            date: data.decisionDate.date
          }
        }
      });
    });

    if(!!localStorage.getItem(event + "_host")) {
      const localHostPassword = localStorage.getItem(event + "_host");
      if(typeof(localHostPassword) === "string") {
        setHostAuthenticated(true);
      }
    }
  }, []);

  const changeHostPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHostPassword(e.target.value);
  };

  const postHostPassword = () => {
    axios.post<AuthResponse>(`/api/v1/check_host/${event}`,
      { hostPassword: hostPassword }
    )
    .then(res => {
      setHostAuthenticated(res.data.auth)
      localStorage.setItem(event + "_host", hostPassword);
    });
  };

  if(!hostAuthenticated) {
    return (
      <div className="container">
        <div className="event-auth-title">
          ホストパスワード
        </div>
        <div className="event-auth-form">
          <input 
            type="text"
            onChange={changeHostPassword} 
          />
        </div>
        <div 
          className="event-button"
          onClick={postHostPassword}  
        >
          送信
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <table className="table-wrapper">
          <tbody>
          <tr className="table-tr">
            <th className="none-border"></th>
            <DateList data={stateEdit}/>
          </tr>
          <ListRender stateEdit={stateEdit}/>
          <DecisionList 
            data={stateEdit}
          />
          </tbody>
        </table>
        <div 
          className="event-button"
          onClick={postDate}
        >
          決定
        </div>
      </div>
    );
  }
};

export {
  DateDecision
}