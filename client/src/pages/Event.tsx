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
import { start } from "repl";

const UserList = (props: any) => {
  let start = Moment(props.data.startDate);
  let end = Moment(props.data.endDate).add("days", 1);
  let list: any = [];

  while(start.format("YYYY-MM-DD") != end.format("YYYY-MM-DD")) {
    let possible_date = props.user.possible.filter((item: any) => {
      return item === start.format("YYYY-MM-DD");
    });
    let subtle_date = props.user.subtle.filter((item: any) => {
      return item === start.format("YYYY-MM-DD");
    });
    let impossible_date = props.user.impossible.filter((item: any) => {
      return item === start.format("YYYY-MM-DD");
    });
    if(!possible_date[0]) {
      if(!subtle_date[0]) {
        list.push(<td>✕</td>);
      } else {
        list.push(<td>△</td>);
      }
    } else {
      list.push(<td>〇</td>);
    }
    start.add('days', 1);
  }
  return (<Fragment>{ list }</Fragment>);
};

const Event: React.FC = () => {
  const { stateEdit, dispatch } = useContext(EventContext);
  const { event } = useParams();
  //contextで認証状態を確認（とりあえず開発中はtureにしてる）
  const [authenticated, setAuthenticated] = useState(true);
  const [render, setRender] = useState(false);
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
    console.log(stateEdit.user);
  }, []);
    
    useEffect(() => {
      setRender(true);
      console.log(Array.isArray(stateEdit.user));
    }, [ stateEdit ]);
    
    const ListRender = () => {
      const trs: any = [];
      if(!stateEdit.user) {
        return (<tr></tr>);
      } else {
        stateEdit.user.map((item: any) => {
          trs.push(
            <tr>
              <UserList
              user={item}
              data={stateEdit}
              />
            </tr>
          )
        })
        return (<Fragment>{ trs }</Fragment>);
      }
    };
    
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
          <ListRender />
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