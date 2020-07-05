import React, { Fragment } from "react";
import Moment from "moment";

const CheckList = (props: any) => {
  const start = Moment(props.data.startDate);
  const end = Moment(props.data.endDate).add("days", 1);
  const list = [];

  const dateCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  while(start.format("YYYY-MM-DD") != end.format("YYYY-MM-DD")) {
    list.push(
      <td>
        <p>
          <input
            type="radio"
            name={`list_${list.length}`}
            value="possible"
            onChange={dateCheck}
          />
            可能
          <input
            type="radio" 
            name={`list_${list.length}`} 
            value="subtle" 
            onChange={dateCheck}
          />
            微妙
          <input 
            type="radio" 
            name={`list_${list.length}`} 
            value="impossible" 
            onChange={dateCheck}
          />
            不可能
        </p>
      </td>
    );
    start.add('days', 1);
  }
  return (<Fragment>{ list }</Fragment>);
};

export {
  CheckList
}