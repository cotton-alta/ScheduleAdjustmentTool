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

const Join: React.FC = () => {
  const { stateEdit, dispatch } = useContext(EventContext);
  useEffect(() => {

  }, []);

  return (
    <div className="join-wrapper">
      <p>
        { stateEdit.title }
      </p>
      <table className="event-table-wrapper">
        <tbody>
          <tr>
            <DateList data={stateEdit}/>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Join;