import React, { useState, useEffect, useReducer, useContext, Fragment } from "react";
import RangeDataPicker from "../components/ui/calendar";
import axios from "axios";
import Moment from "moment";

import "../assets/style/edit.scss";

const initEvent = {
  title: "sample",
  password: "password",
  description: "説明",
  startDate: "2020/05/31",
  endDate: "2020/05/31"
};

const Join: React.FC = () => {
  return (
    <div className="join-wrapper">
    </div>
  );
};

export default Join;