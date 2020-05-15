import React, { useState, useEffect, Fragment } from "react";
import RangeDataPicker from "../components/ui/calendar";
import axios from "axios";

import "../assets/style/edit.scss";

const App: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    console.log("description : ", description);
  };
  const postData = async () => {
    const data = await axios.get('/');
    console.log(data);
  };
  
  useEffect(() => {
    console.log("title : ", title);
  }, [title]);

  return (
    <div className="edit-wrapper">
      <span className="edit-title">イベント名</span>
      <input type="text" value={title} onChange={changeTitle}/>
      <span className="edit-title">詳細</span>
      <textarea cols={10} value={description} onChange={changeDescription} />
      <RangeDataPicker />
      <button onClick={postData}>送信</button>
    </div>
  );
};

export default App;