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

const DateDecision: React.FC = () => {
  const [ authenticated, setAuthenticated ] = useState(false);
  const { stateEdit, dispatch } = useContext(EventContext);
  const [ password, setPassword ] = useState("");
  const [ eventData, setEventData ] = useState<Event | null>(null);
  const { event } = useParams();

  useEffect(() => {
    axios.get(`/api/v1/events/${event}`)
    .then(res => {
      const data = res.data;
      setEventData(data.title);
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
        setPassword(localPassword);
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
            start={stateEdit.startDate} 
            end={stateEdit.endDate}
          />
          </tbody>
        </table>
      </div>
    );
  }
};

export {
  DateDecision
}