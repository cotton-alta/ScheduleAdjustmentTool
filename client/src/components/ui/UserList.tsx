import React, { Fragment } from "react";
import Moment from "moment";

import "../../assets/style/table.scss";

const UserList = (props: any) => {
  let start = Moment(props.data.startDate);
  let end = Moment(props.data.endDate).add("days", 1);
  let list: any = [];

  list.push(<td className="table-td table-username">{ props.user.name }</td>);
  while(start.format("YYYY-MM-DD") != end.format("YYYY-MM-DD")) {
    let possible_date = props.user.possible.filter((item: any) => {
      return item === start.format("YYYY-MM-DD");
    });
    let subtle_date = props.user.subtle.filter((item: any) => {
      return item === start.format("YYYY-MM-DD");
    });
    console.log(
      "start.format: ", start.format("YYYY-MM-DD"),
      "props.key: ", props.most_likely
    );
    if(props.most_likely.includes(start.format("YYYY-MM-DD"))) {
      if(!possible_date[0]) {
        if(!subtle_date[0]) {
          list.push(<td className="table-td--most">×</td>);
        } else {
          list.push(<td className="table-td--most">△</td>);
        }
      } else {
        list.push(<td className="table-td--most">〇</td>);
      }
    } else {
      if(!possible_date[0]) {
        if(!subtle_date[0]) {
          list.push(<td className="table-td">×</td>);
        } else {
          list.push(<td className="table-td">△</td>);
        }
      } else {
        list.push(<td className="table-td">〇</td>);
      }

    }
    start.add('days', 1);
  }
  return (<Fragment>{ list }</Fragment>);
};

export {
  UserList
}