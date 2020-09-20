import React, { Fragment } from "react";
import Moment from "moment";
import { UserList } from "./UserList";

import "../../assets/style/table.scss";

const ListRender = (props: any) => {
  const list: Array<JSX.Element> = [];
  if(!props.stateEdit.user) {
    return (<tr></tr>);
  } else {
    const start = Moment(props.stateEdit.startDate);
    const end = Moment(props.stateEdit.endDate).add("days", 1);
    const possible_user_list = new Map();
    while(start.format() !== end.format()) {
      let possible_user = 0;
      props.stateEdit.user.map((user: any) => {
        const jadge_possible = user.possible.some((date: string) => date == start.format("YYYY-MM-DD"));
        const jadge_subtle = user.subtle.some((date: string) => date == start.format("YYYY-MM-DD"));
        if(jadge_possible) {
          possible_user++;
        } else if(jadge_subtle) {
          possible_user += 0.5;
        }
      });
      possible_user_list.set(start.format("YYYY-MM-DD"), possible_user);
      start.add('days', 1);
    }
    
    let state_value = { 
      key: [Moment(props.stateEdit.startDate).format("YYYY-MM-DD")],
      value: possible_user_list.get(
        Moment(props.stateEdit.startDate).format("YYYY-MM-DD")
      ) 
    };
    possible_user_list.forEach((value, key) => {
      if(value > state_value.value) {
        state_value.key = [];
        state_value.key.push(key);
        state_value.value = value;
      } else if(value == state_value.value) {
        state_value.key.push(key);
      }
    });

    props.stateEdit.user.map((item: any) => {
      list.push(
        <tr className="table-tr">
          <UserList
            user={item}
            data={props.stateEdit}
            most_likely={ state_value.key }
          />
        </tr>
      );
    });
    return (<Fragment>{ list }</Fragment>);
  }
};

export {
  ListRender
}