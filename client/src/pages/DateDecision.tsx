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

const DateDecision: React.FC = () => {
  const [ authenticated, setAuthenticated ] = useState(false);
  const { stateEdit, dispatch } = useContext(EventContext);
  const { event } = useParams<any>();

  const postDate = () => {
    axios.post(`/api/v1/events/${event}/decision`, stateEdit)
    .then(result => {
      // history.push(`/event/${result.data._id}`);
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
          user:        data.user
        }
      });
    });

    if(!!localStorage.getItem(event)) {
      const localPassword = localStorage.getItem(event);
      if(typeof(localPassword) === "string") {
        setAuthenticated(true);
      }
    }
  }, []);

  if(!authenticated) {
    return (
      <div className="container">
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