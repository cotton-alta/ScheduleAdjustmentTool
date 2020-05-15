import React, { useState, useEffect, Fragment } from "react";
import RangeDataPicker from "../components/ui/calendar";
import axios from "axios";
import Moment from "moment";

import "../assets/style/edit.scss";

const App: React.FC = () => {
  const initDate = Moment().format();
  const [title, setTitle] = useState(""),
        [description, setDescription] = useState(""),
        [startDate, setStartDate]: [
          string,
          React.Dispatch<React.SetStateAction<string>>
        ] = useState<string>(initDate),
        [endDate, setEndDate]: [
          string,
          React.Dispatch<React.SetStateAction<string>>
        ] = useState<string>(initDate);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    console.log("description : ", description);
  };

  const postData = async () => {
    let inputData = {
      title: title,
      description: description,
      startDate: startDate,
      endDate: endDate
    };
    const data = await axios.post('/',
      inputData,
      { headers: {"Content-Type":"application/json"} }
    );
    console.log(data);
  };
  
  useEffect(() => {
    console.log("title : ", title);
  }, [title]);

  useEffect(() => {
    console.log(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <div className="edit-wrapper">
      <span className="edit-title">イベント名</span>
      <input type="text" value={title} onChange={changeTitle}/>
      <span className="edit-title">詳細</span>
      <textarea cols={10} value={description} onChange={changeDescription} />
      <RangeDataPicker 
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <div className="edit-button" onClick={postData}>送信</div>
    </div>
  );
};

export default App;