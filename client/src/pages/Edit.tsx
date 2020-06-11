import React, { useState, useEffect, useReducer, useContext, Fragment } from "react";
import RangeDataPicker from "../components/ui/calendar";
import axios from "axios";
import Moment from "moment";
import { eventAction } from "../actions/event";

import "../assets/style/edit.scss";

// const EditContext = React.createContext<any>(null);
const initEvent = {
  title: "sample",
  password: "password",
  description: "説明",
  startDate: "2020/05/31",
  endDate: "2020/05/31"
};

const App: React.FC = () => {
  const [ stateEdit, dispatch ] = useReducer(eventAction, initEvent);

  const initDate = Moment().format();
  const [startDate, setStartDate]: [
          string,
          React.Dispatch<React.SetStateAction<string>>
        ] = useState<string>(initDate),
        [endDate, setEndDate]: [
          string,
          React.Dispatch<React.SetStateAction<string>>
        ] = useState<string>(initDate);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "checkEvent",
      payload: {
        title: e.target.value
      }
    });
  };
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "checkEvent",
      payload: {
        password: e.target.value
      }
    });
  };
  const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: "checkEvent",
      payload: {
        description: e.target.value
      }
    });
  };

  const postData = async () => {
    let inputData = {
      title: stateEdit.title,
      description: stateEdit.description,
      startDate: startDate,
      endDate: endDate,
      password: stateEdit.password
    };
    const data = await axios.post('/',
      inputData,
      { headers: {"Content-Type":"application/json"} }
    );
    console.log("data : ", data);
  };

  // useEffect(() => {
  //   console.log(startDate, endDate);
  // }, [startDate, endDate]);

  return (
    <div className="edit-wrapper">
      <span className="edit-title">イベント名</span>
      <input type="text" value={stateEdit.title} onChange={changeTitle}/>
      <span className="edit-title">詳細</span>
      <textarea cols={10} value={stateEdit.description} onChange={changeDescription} />
      <span className="edit-title">パスワード</span>
      <input type="text" value={stateEdit.password} onChange={changePassword}/>
      <RangeDataPicker 
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        />
      <div className="edit-button" onClick={postData}>確認</div>
    </div>
  );
};

export default App;