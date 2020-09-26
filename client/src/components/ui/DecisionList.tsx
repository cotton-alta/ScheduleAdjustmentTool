import React, { Fragment } from "react";
import Moment from "moment";

const DecisionList = (props: any) => {
  const start = Moment(props.data.startDate);
  const end = Moment(props.data.endDate).add("days", 1);
  const list = [];
  list.push(<td className="table-td"></td>);

  const dateCheck = (e: React.ChangeEvent<HTMLInputElement>, date: string) => {

  };

  while(start.format("YYYY-MM-DD") != end.format("YYYY-MM-DD")) {
    let date = start.format("YYYY-MM-DD");
    list.push(
      <td className="table-td">
        <div className="table-radio">
          <input
            id={`decision_${list.length}`}
            type="radio"
            name="decision"
            value={ date }
            onChange={(e) => {dateCheck(e, date)}}
          />
        </div>
      </td>
    );
    start.add('days', 1);
  }

  return (<Fragment>{ list }</Fragment>)
};

export {
  DecisionList
}