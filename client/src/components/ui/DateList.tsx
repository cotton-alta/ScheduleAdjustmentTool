import React, { Fragment } from "react";
import Moment from "moment";

import "../../assets/style/table.scss";

const DateList = (props: any) => {
  const start = Moment(props.data.startDate);
  const end = Moment(props.data.endDate);
  const list = [];
  while(start.format() != end.format()) {
    list.push(<th className="table-th">{ start.format("MM/DD") }</th>);
    start.add('days', 1);
  }
  list.push(<th className="table-th">{ start.format("MM/DD") }</th>);
  return (<Fragment>{ list }</Fragment>);
};

export {
  DateList
}