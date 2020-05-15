import React, { useState, useEffect, Fragment } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "moment";

import "../../assets/style/calendar.scss";

type DateType = {
  startDate: string
  endDate: string
  setStartDate: React.Dispatch<React.SetStateAction<string>>
  setEndDate: React.Dispatch<React.SetStateAction<string>>
}

const RangeDataPicker: React.FC<DateType> = (props: DateType) => {
  const handleDateStart = (selectedDate: Date) => {
    props.setStartDate(Moment(selectedDate).format());
  };
  const handleDateEnd = (selectedDate: Date) => {
    props.setEndDate(Moment(selectedDate).format());
  };

  return (
    <div className="calendar-wrapper">
      <div>
        <span className="calendar-title">開始日</span>
        <DatePicker 
          selected={ Moment(props.startDate).toDate() }
          selectsStart
          startDate={ Moment(props.startDate).toDate() }
          endDate={ Moment(props.endDate).toDate() }
          onChange={ handleDateStart }
          />
      </div>
      <div>
        <span className="calendar-title">終了日</span>
        <DatePicker 
          selected={ Moment(props.endDate).toDate() }
          selectsEnd
          startDate={ Moment(props.startDate).toDate() }
          endDate={ Moment(props.endDate).toDate() }
          onChange={ handleDateEnd }
        />
      </div>
    </div>
  );
};

export default RangeDataPicker;