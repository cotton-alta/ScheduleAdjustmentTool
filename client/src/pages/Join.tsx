import 
  React,
  { 
    useState,
    useEffect,
    useReducer,
    useContext,
    Fragment
  } from "react";
import axios from "axios";
import Moment from "moment";
import { EventContext } from "../App";
import { DateList } from "../components/ui/DateList";
import { userAction } from "../actions/user";

type User = {
  name:       string,
  possible:   string[],
  subtle:     string[],
  impossible: string[]
}

let initUser: User = {
  name: "",
  possible: [],
  subtle: [],
  impossible: []
}

const CheckList = (props: any) => {
  const start = Moment(props.data.startDate);
  const end = Moment(props.data.endDate);
  const list = [];

  const dateCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  while(start.format() != end.format()) {
    list.push(
      <th>
        <p>
          <input
            type="radio"
            name={`list_${list.length}`}
            value="possible"
            onChange={dateCheck}
          />
            可能
          <input
            type="radio" 
            name={`list_${list.length}`} 
            value="subtle" 
            onChange={dateCheck}
          />
            微妙
          <input 
            type="radio" 
            name={`list_${list.length}`} 
            value="impossible" 
            onChange={dateCheck}
          />
            不可能
        </p>
      </th>
    );
    start.add('days', 1);
  }
  list.push(
    <th>
    <p>
      <input
        type="radio"
        name={`list_${list.length}`}
        value="possible"
        onChange={dateCheck}
      />
        可能
      <input
        type="radio" 
        name={`list_${list.length}`} 
        value="subtle" 
        onChange={dateCheck}
      />
        微妙
      <input 
        type="radio" 
        name={`list_${list.length}`} 
        value="impossible" 
        onChange={dateCheck}
      />
        不可能
    </p>
  </th>
  );
  return (<Fragment>{ list }</Fragment>);
};

const Join: React.FC = () => {
  const { stateEdit, dispatch } = useContext(EventContext);

  // initUserの値を書き換える処理

  // const { stateUser, userDispatch } = useReducer(userAction, initUser);
  useEffect(() => {

  }, []);

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    dispatch({
      type: "nameChange",
      payload: {
        // description: e.target.value
      }
    });
  };

  return (
    <div className="join-wrapper">
      <input type="text" onChange={changeName} />
      <table className="event-table-wrapper">
        <tbody>
          <tr>
            <DateList data={ stateEdit } />
          </tr>
          <tr>
            <CheckList data={ stateEdit } />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Join;