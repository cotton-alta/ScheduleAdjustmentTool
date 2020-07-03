import
  React, 
  {
    useState,
    useEffect,
    useReducer,
    useContext, 
    Fragment
  } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import { eventAction } from "../actions/event";
import { EventContext } from "../App";
import { DateList } from "../components/ui/DateList";

import "../assets/style/event.scss";

const Event: React.FC = () => {
  const { stateEdit, dispatch } = useContext(EventContext);
  const { event } = useParams();
  //contextで認証状態を確認（とりあえず開発中はtureにしてる）
  const [authenticated, setAuthenticated] = useState(true);
  const [eventData, setEventData] = useState<any | null>(null);

  useEffect(() => {
    // 5ef9d12b5606394cf99f404a
    axios.get(`/api/v1/events/${event}`)
      .then((result: any) => {
        const data = result.data[0];
        console.log(result)
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
  }, []);
  
  useEffect(() => {
    console.log(stateEdit);
    console.log(DateList);
  }, [ stateEdit ]);

  if(!authenticated) {
    return (
      <div></div>
    );
  } else {
    return (
      <div className="container">
        <div>path : {event}</div>
        <div>event title : {stateEdit.title}</div>
        <table className="event-table-wrapper">
          <tbody>
          <tr>
            <th>名前</th>
            <DateList data={stateEdit}/>
          </tr>
          <tr>
            <th>Taro</th>
            <td>b</td>
            <td>b</td>
            <td>b</td>
          </tr>
          <tr>
            <th>Sato</th>
            <td>b</td>
            <td>b</td>
            <td>b</td>
          </tr>
          <tr>
            <th>Suzuki</th>
            <td>b</td>
            <td>b</td>
            <td>b</td>
          </tr>
          </tbody>
        </table>
        <div className="event-join-button">
          <Link to={`/join/${event}`}>
            このイベントに参加
          </Link>
        </div>
      </div>
    )
  }
};

export default Event;