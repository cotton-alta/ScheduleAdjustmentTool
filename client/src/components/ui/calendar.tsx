import React, { useState, useEffect, Fragment } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "moment";

import "../../assets/style/calendar.scss";

const RangeDataPicker: React.FC = () => {
  const initDate = Moment();
  const [startDate, setStartDate] = useState(initDate);
  const [endDate, setEndDate] = useState(initDate.add('days', 7));

  const handleDateStart = (selectedDate: Date) => {
    setStartDate(Moment(selectedDate));
  };
  const handleDateEnd = (selectedDate: Date) => {
    setEndDate(Moment(selectedDate));
  };
  
  useEffect(() => {
    console.log(startDate.format(), endDate.format());
  }, [startDate, endDate]);

  return (
    <div className="calendar-wrapper">
      <div>
        <span className="calendar-title">開始日</span>
        <DatePicker 
          selected={ Moment(startDate).toDate() }
          selectsStart
          startDate={ Moment(startDate).toDate() }
          endDate={ Moment(endDate).toDate() }
          onChange={ handleDateStart }
          />
      </div>
      <div>
        <span className="calendar-title">終了日</span>
        <DatePicker 
          selected={ Moment(endDate).toDate() }
          selectsEnd
          startDate={ Moment(startDate).toDate() }
          endDate={ Moment(endDate).toDate() }
          onChange={ handleDateEnd }
        />
      </div>
    </div>
  );
};

export default RangeDataPicker;