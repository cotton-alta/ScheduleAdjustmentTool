import React, { Fragment } from "react";
import Moment from "moment";

const DateList = (props: any) => {
  const start = Moment(props.data.startDate);
  const end = Moment(props.data.endDate);
  const list = [];
  while(start.format() != end.format()) {
    list.push(<th>{ start.format("YYYY-MM-DD") }</th>);
    start.add('days', 1);
  }
  list.push(<th>{ start.format("YYYY-MM-DD") }</th>);
  return (<Fragment>{ list }</Fragment>);
};

export {
  DateList
}