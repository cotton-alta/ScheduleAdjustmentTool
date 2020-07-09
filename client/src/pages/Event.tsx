import
  React, 
  {
    useState,
    useEffect,
    useContext, 
    Fragment
  } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import { EventContext } from "../App";
import { DateList } from "../components/ui/DateList";

import "../assets/style/event.scss";

const UserList = (props: any) => {
  let start = Moment(props.data.startDate);
  let end = Moment(props.data.endDate).add("days", 1);
  let list: any = [];

  list.push(<th>{ props.user.name }</th>);
  while(start.format("YYYY-MM-DD") != end.format("YYYY-MM-DD")) {
    let possible_date = props.user.possible.filter((item: any) => {
      return item === start.format("YYYY-MM-DD");
    });
    let subtle_date = props.user.subtle.filter((item: any) => {
      return item === start.format("YYYY-MM-DD");
    });
    if(!possible_date[0]) {
      if(!subtle_date[0]) {
        list.push(<td>×</td>);
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
  const [ password, setPassword ] = useState("");
  const { event } = useParams();
  //contextで認証状態を確認（とりあえず開発中はtureにしてる）
  const [authenticated, setAuthenticated] = useState(false);
  const [eventData, setEventData] = useState<any | null>(null);
  
  useEffect(() => {
    // 5ef9d12b5606394cf99f404a
    // 5f005ec0e75af0003168bae3
    // 5f00657fac7f490031940f8f
    axios.get(`/api/v1/events/${event}`)
    .then((result: any) => {
      const data = result.data;
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
  
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(password);
  };
  
  const postPassword = () => {
    axios.post(`/api/v1/check/${event}`, 
    { password: password }
    )
    .then((result: any) => {
      console.log(result);
      setAuthenticated(result.data.auth);
    });
  };
  
  const ListRender = () => {
    const list: Array<JSX.Element> = [];
    if(!stateEdit.user) {
      return (<tr></tr>);
    } else {
      const start = Moment(stateEdit.startDate);
      const end = Moment(stateEdit.endDate).add("days", 1);
      const possible_user_list = [];
      while(start.format() != end.format()) {
        let possible_user = 0;
        stateEdit.user.map((user: any) => {
          let jadge = user.possible.some((date: string) => date == start.format("YYYY-MM-DD"))
          if(jadge) {
            possible_user++;
          }
        });
        possible_user_list.push(possible_user);
        start.add('days', 1);
      }
      console.log("possible_user_list: ", possible_user_list);

      stateEdit.user.map((item: any) => {
        list.push(
          <tr>
            <UserList
              user={item}
              data={stateEdit}
              />
          </tr>
        );
      });
      return (<Fragment>{ list }</Fragment>);
    }
  };
  
  if(!authenticated) {
    return ( 
      <div className="container">
        <div className="event-auth-title">
          イベントパスワード
        </div>
        <div className="event-auth-form">
          <input 
            type="text"
            onChange={changePassword} 
            />
        </div>
        <div 
          className="event-button"
          onClick={postPassword}  
          >
          送信
        </div>
      </div>
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
          <ListRender />
          </tbody>
        </table>
        <div className="event-button">
          <Link className="event-link" to={`/join/${event}`}>
            このイベントに参加
          </Link>
        </div>
      </div>
    )
  }
};

export default Event;