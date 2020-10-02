import React, { Fragment, useContext } from "react";
import Moment from "moment";
import { EventContext } from "../../App";

const DecisionList = (props: any) => {
  const start = Moment(props.data.startDate);
  const end = Moment(props.data.endDate).add("days", 1);
  const { stateEdit, dispatch } = useContext(EventContext);
  const list = [];
  list.push(<td className="table-td"></td>);

  function dateCheck(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "setDecisionDate",
      payload: {
        decisionDate: {
          judge: false,
          date: e.target.value
        }
      }
    });
  }

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
            onChange={dateCheck}
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