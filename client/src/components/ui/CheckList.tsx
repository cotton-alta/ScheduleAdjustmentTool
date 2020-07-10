import React, { useContext, Fragment } from "react";
import Moment from "moment";
import { UserContext } from "../../pages/Join";

type UpdateUserProperty = {
  [key: string]: Array<string>
}

const CheckList = (props: any) => {
  const { stateUser, userDispatch } = useContext(UserContext);
  const start = Moment(props.data.startDate);
  const end = Moment(props.data.endDate).add("days", 1);
  const list = [];

  const dateCheck = (e: React.ChangeEvent<HTMLInputElement>, index: number, date: string) => {
    const participation = e.target.value;
    let updateUser: UpdateUserProperty = {
      possible: [],
      subtle: [],
      impossible: []
    };

    updateUser.possible = stateUser.possible.filter((item: string) => { return item != date });
    updateUser.subtle = stateUser.subtle.filter((item: string) => { return item != date });
    updateUser.impossible = stateUser.impossible.filter((item: string) => { return item != date });
    updateUser[participation].push(date);
    
    userDispatch({
      type: "dataChange",
      payload: {
        possible: updateUser.possible,
        subtle: updateUser.subtle,
        impossible: updateUser.impossible
      }
    })
  };

  while(start.format("YYYY-MM-DD") != end.format("YYYY-MM-DD")) {
    let date = start.format("YYYY-MM-DD");
    list.push(
      <td className="table-td">
        <p>
          <input
            type="radio"
            name={`list_${list.length}`}
            value="possible"
            onChange={(e) => {dateCheck(e, list.length - 1, date)}}
          />
            可能
          <input
            type="radio" 
            name={`list_${list.length}`}
            value="subtle" 
            onChange={(e) => {dateCheck(e, list.length - 1, date)}}
          />
            微妙
          <input 
            type="radio" 
            name={`list_${list.length}`} 
            value="impossible" 
            onChange={(e) => {dateCheck(e, list.length - 1, date)}}
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